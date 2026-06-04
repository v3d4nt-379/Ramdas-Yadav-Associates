import { type NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { order_id, email, otp } = await request.json();

    if (!order_id || !email || !otp) {
      return Response.json({ error: 'Order ID, Email, and OTP are required' }, { status: 400 });
    }

    // Find the order
    const orderQuery = await adminDb
      .collection('orders')
      .where('order_id', '==', order_id)
      .where('cust_email', '==', email.trim())
      .limit(1)
      .get();

    if (orderQuery.empty) {
      return Response.json({ error: 'Invalid Order ID or Email match' }, { status: 404 });
    }

    const orderDoc = orderQuery.docs[0];
    const orderData = orderDoc.data();

    // Verify OTP
    if (!orderData.trackingOtp || orderData.trackingOtp !== otp) {
      return Response.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Check expiration
    if (!orderData.trackingOtpExpiresAt || orderData.trackingOtpExpiresAt.toDate() < new Date()) {
      return Response.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Clear OTP for security (one-time use)
    await adminDb.collection('orders').doc(orderDoc.id).update({
      trackingOtp: FieldValue.delete(),
      trackingOtpExpiresAt: FieldValue.delete(),
    });

    // Strip out internal fields before returning to client (like internal customer IDs etc)
    const safeOrderDetails = {
      order_id: orderData.order_id,
      service_name: orderData.service_name,
      service_price: orderData.service_price,
      order_status: orderData.order_status,
      payment_status: orderData.payment_status,
      payment_id: orderData.payment_id,
      createdAt: orderData.createdAt.toDate().toISOString(),
      updatedAt: orderData.updatedAt.toDate().toISOString(),
      cust_name: orderData.cust_name,
    };

    return Response.json({
      success: true,
      order: safeOrderDetails,
    });

  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    const message = error?.message || 'Failed to verify OTP';
    return Response.json({ error: message }, { status: 500 });
  }
}
