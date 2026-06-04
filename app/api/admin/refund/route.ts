import { type NextRequest } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payment_id, amount } = body;

    if (!payment_id || !amount) {
      return Response.json({ error: 'payment_id and amount are required' }, { status: 400 });
    }

    // Process refund via Razorpay SDK
    // The amount should be in paise
    const refund = await razorpay.payments.refund(payment_id, {
      amount: amount,
    });

    if (refund.status !== 'processed' && refund.status !== 'pending') {
      return Response.json({ error: `Refund failed: ${refund.status}` }, { status: 400 });
    }

    // Update Firestore payment record
    await adminDb.collection('payments').doc(payment_id).update({
      status: 'refunded',
      razorpay_refund_id: refund.id,
      updatedAt: new Date(),
    });

    // Also try to update the order status if we can find it
    const paymentsDoc = await adminDb.collection('payments').doc(payment_id).get();
    const paymentData = paymentsDoc.data();
    if (paymentData && paymentData.order_id) {
      const ordersQuery = await adminDb.collection('orders').where('order_id', '==', paymentData.order_id).limit(1).get();
      if (!ordersQuery.empty) {
        await adminDb.collection('orders').doc(ordersQuery.docs[0].id).update({
          payment_status: 'refunded',
          order_status: 'declined_refunded',
          updatedAt: new Date(),
        });
      }
    }

    return Response.json({
      success: true,
      refund_id: refund.id,
      message: 'Refund processed successfully',
    });

  } catch (error: any) {
    console.error('Error processing refund:', error);
    const message = error?.error?.description || error?.message || 'Failed to process refund';
    return Response.json({ error: message }, { status: 500 });
  }
}
