import { type NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { randomInt } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { order_id, email } = await request.json();

    if (!order_id || !email) {
      return Response.json({ error: 'Order ID and Email are required' }, { status: 400 });
    }

    // Find the order
    const orderQuery = await adminDb
      .collection('orders')
      .where('order_id', '==', order_id)
      .where('cust_email', '==', email.trim())
      .limit(1)
      .get();

    if (orderQuery.empty) {
      // Don't leak whether it exists or not
      return Response.json({ error: 'Invalid Order ID or Email match' }, { status: 404 });
    }

    const orderDoc = orderQuery.docs[0];
    const orderData = orderDoc.data();

    // Generate 6-digit OTP
    const otp = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save to Firestore
    await adminDb.collection('orders').doc(orderDoc.id).update({
      trackingOtp: otp,
      trackingOtpExpiresAt: expiresAt,
    });

    // Send email via Resend
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email.trim(),
      subject: `Your Tracking OTP is ${otp} | Ramdas Yadav Associates`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 32px;">
          <h2 style="font-size: 20px; font-weight: 800; color: #18181b; margin-top: 0;">Order Tracking OTP</h2>
          <p style="color: #71717a; font-size: 14px; margin-bottom: 24px;">
            Hello ${orderData.cust_name},<br>
            Please use the following OTP to securely access your order tracking portal for order <strong>${order_id}</strong>.
          </p>
          <div style="background: #fff; border: 1px solid #e4e4e7; padding: 24px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 4px; color: #18181b;">${otp}</span>
          </div>
          <p style="color: #71717a; font-size: 12px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'OTP sent to email' });

  } catch (error: any) {
    console.error('Error sending OTP:', error);
    const message = error?.message || 'Failed to send OTP';
    return Response.json({ error: message }, { status: 500 });
  }
}
