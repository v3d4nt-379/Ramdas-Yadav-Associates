import { type NextRequest } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { randomUUID } from 'crypto';
import { resend, FROM_EMAIL } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerDetails,
      service_id,
    } = body;

    // ─── Validate inputs ───────────────────────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json({ error: 'Missing payment details' }, { status: 400 });
    }
    if (!customerDetails?.name || !customerDetails?.phone || !service_id) {
      return Response.json({ error: 'Missing customer or service details' }, { status: 400 });
    }

    // ─── Verify HMAC Signature ─────────────────────────────────
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error('RAZORPAY_KEY_SECRET is not set');
    }

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return Response.json({ error: 'Invalid payment signature. Payment may be tampered.' }, { status: 400 });
    }

    // ─── Fetch Service Details ─────────────────────────────────
    const serviceDoc = await adminDb.collection('services').doc(service_id).get();
    if (!serviceDoc.exists) {
      throw new Error(`Service not found: ${service_id}`);
    }
    const serviceData = serviceDoc.data()!;

    // ─── Upsert Customer (dedup by phone, never overwrite) ────
    const customerQuery = await adminDb
      .collection('customers')
      .where('cust_phone', '==', customerDetails.phone)
      .limit(1)
      .get();

    let customerId: string;
    if (!customerQuery.empty) {
      customerId = customerQuery.docs[0].id;
    } else {
      customerId = randomUUID();
      await adminDb.collection('customers').doc(customerId).set({
        customer_id: customerId,
        cust_name: customerDetails.name.trim(),
        cust_phone: customerDetails.phone,
        cust_email: customerDetails.email?.trim() || '',
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    // ─── Generate human-readable Order ID ──────────────────────
    const countQuery = await adminDb.collection('orders').count().get();
    const currentCount = countQuery.data().count;
    const orderNumber = String(currentCount + 1).padStart(5, '0');
    const order_id = `RYA-${new Date().getFullYear()}-${orderNumber}`;
    const internalDocId = randomUUID();

    // ─── Create Order ──────────────────────────────────────────
    const orderData = {
      order_id,
      customer_id: customerId,
      cust_name: customerDetails.name.trim(),
      cust_phone: customerDetails.phone,
      cust_email: customerDetails.email?.trim() || '',
      service_id,
      service_name: serviceData.service_name,
      service_price: serviceData.service_price,
      order_message: customerDetails.message?.trim() || '',
      order_status: 'placed',
      payment_status: 'paid',
      payment_id: razorpay_payment_id,
      razorpay_order_id,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await adminDb.collection('orders').doc(internalDocId).set(orderData);

    // ─── Create Payment Record ─────────────────────────────────
    await adminDb.collection('payments').doc(razorpay_payment_id).set({
      payment_id: razorpay_payment_id,
      order_id,
      razorpay_order_id,
      razorpay_signature,
      amount: serviceData.service_price,
      status: 'paid',
      createdAt: FieldValue.serverTimestamp(),
    });

    // ─── Send Confirmation Email (best-effort) ─────────────────
    if (customerDetails.email?.trim()) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: customerDetails.email.trim(),
          subject: `Order Confirmed — ${order_id} | Ramdas Yadav Associates`,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #09090b; padding: 32px 24px; text-align: center;">
                <h1 style="color: #facc15; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">Ramdas Yadav Associates</h1>
              </div>
              <div style="padding: 32px 24px; background: #fafafa;">
                <h2 style="font-size: 22px; font-weight: 800; color: #18181b; margin: 0 0 8px;">Payment Successful</h2>
                <p style="color: #71717a; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
                  Thank you, <strong style="color: #18181b;">${customerDetails.name.trim()}</strong>. Your order is confirmed.
                </p>
                <div style="background: #fff; border: 1px solid #e4e4e7; padding: 20px; margin-bottom: 24px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; font-size: 13px; color: #71717a; width: 120px;">Order ID</td><td style="padding: 8px 0; font-size: 13px; color: #18181b; font-weight: 600;">${order_id}</td></tr>
                    <tr><td style="padding: 8px 0; font-size: 13px; color: #71717a;">Service</td><td style="padding: 8px 0; font-size: 13px; color: #18181b; font-weight: 600;">${serviceData.service_name}</td></tr>
                    <tr><td style="padding: 8px 0; font-size: 13px; color: #71717a;">Amount</td><td style="padding: 8px 0; font-size: 13px; color: #18181b; font-weight: 600;">&#8377;${(serviceData.service_price / 100).toLocaleString('en-IN')}</td></tr>
                    <tr><td style="padding: 8px 0; font-size: 13px; color: #71717a;">Payment ID</td><td style="padding: 8px 0; font-size: 13px; color: #18181b;">${razorpay_payment_id}</td></tr>
                  </table>
                </div>
                <p style="color: #71717a; font-size: 13px;">Our team will reach out to you shortly. For any queries, contact us via WhatsApp or call.</p>
              </div>
            </div>
          `,
        });
        console.log('Order confirmation email sent to', customerDetails.email.trim());
      } catch (emailError) {
        console.error('Order email send failed (non-fatal):', emailError);
      }
    }

    return Response.json({
      success: true,
      order_id,
      message: 'Payment verified and order created successfully.',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    const message = error?.message || 'Payment verification failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
