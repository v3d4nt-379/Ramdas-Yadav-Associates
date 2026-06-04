import { type NextRequest } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service_id } = body;

    if (!service_id) {
      return Response.json({ error: 'service_id is required' }, { status: 400 });
    }

    // Fetch the actual price from Firestore to prevent client-side tampering
    const serviceDoc = await adminDb.collection('services').doc(service_id).get();
    if (!serviceDoc.exists) {
      return Response.json({ error: 'Service not found' }, { status: 404 });
    }

    const serviceData = serviceDoc.data();
    if (!serviceData?.isActive) {
      return Response.json({ error: 'Service is currently unavailable' }, { status: 400 });
    }

    const amountInPaise = serviceData.service_price;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    const message = error?.error?.description || error?.message || 'Failed to create order';
    return Response.json({ error: message }, { status: 500 });
  }
}
