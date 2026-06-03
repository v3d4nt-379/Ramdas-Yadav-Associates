import { adminDb } from '@/lib/firebase-admin';
import { resend, FROM_EMAIL } from '@/lib/resend';
import { type NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { randomUUID } from 'crypto';

// POST /api/enquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // ─── Validation ────────────────────────────────────────────
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json({ error: 'Name is required (min 2 chars).' }, { status: 400 });
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return Response.json({ error: 'Phone must be a valid 10-digit number.' }, { status: 400 });
    }

    if (!service || typeof service !== 'string') {
      return Response.json({ error: 'Service is required.' }, { status: 400 });
    }

    // ─── Find or Create Customer ───────────────────────────────
    // Dedup by phone. If phone exists → reuse customer_id.
    // We do NOT overwrite the existing customer's name/email —
    // each enquiry stores its own submitted details (denormalized).
    const customerQuery = await adminDb
      .collection('customers')
      .where('cust_phone', '==', phone)
      .limit(1)
      .get();

    let customerId: string;

    if (!customerQuery.empty) {
      // Existing customer — just reuse their ID, don't overwrite details
      customerId = customerQuery.docs[0].id;
    } else {
      // New customer — create with the first submitted details
      customerId = randomUUID();
      await adminDb.collection('customers').doc(customerId).set({
        customer_id: customerId,
        cust_name: name.trim(),
        cust_phone: phone,
        cust_email: email?.trim() || '',
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    // ─── Create Enquiry ────────────────────────────────────────
    // Each enquiry stores its own name/phone/email (denormalized)
    // so admin always sees who submitted what, even if details differ
    const enquiryId = randomUUID();
    const enquiryData = {
      enquiry_id: enquiryId,
      customer_id: customerId,
      cust_name: name.trim(),
      cust_phone: phone,
      cust_email: email?.trim() || '',
      service_name: service,
      enquiry_message: message?.trim() || '',
      enquiry_status: 'new',
      createdAt: FieldValue.serverTimestamp(),
    };

    await adminDb.collection('enquiries').doc(enquiryId).set(enquiryData);

    // ─── Send Confirmation Email (if email provided) ───────────
    // NOTE: Resend free tier with onboarding@resend.dev can ONLY send
    // to the email registered on your Resend account. To send to any
    // customer, add & verify your own domain in Resend dashboard.
    if (email && email.trim()) {
      try {
        const emailResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: email.trim(),
          subject: 'Enquiry Received — Ramdas Yadav Associates',
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; padding: 0;">
              <!-- Header -->
              <div style="background: #09090b; padding: 32px 24px; text-align: center;">
                <h1 style="color: #facc15; font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px 0;">
                  Ramdas Yadav Associates
                </h1>
                <p style="color: #a1a1aa; font-size: 12px; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">
                  Professional Financial Services
                </p>
              </div>
              
              <!-- Body -->
              <div style="padding: 32px 24px;">
                <h2 style="font-size: 22px; font-weight: 800; color: #18181b; margin: 0 0 8px 0;">
                  We've Received Your Enquiry
                </h2>
                <p style="color: #71717a; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                  Thank you for reaching out, <strong style="color: #18181b;">${name.trim()}</strong>. Our team will review your enquiry and get back to you within 24 hours.
                </p>
                
                <!-- Enquiry Details Card -->
                <div style="background: #ffffff; border: 1px solid #e4e4e7; padding: 20px; margin-bottom: 24px;">
                  <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #a1a1aa; font-weight: 700; margin: 0 0 12px 0;">
                    Enquiry Details
                  </p>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #71717a; width: 120px; vertical-align: top;">Service</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #18181b; font-weight: 600;">${service}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #71717a; vertical-align: top;">Name</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #18181b;">${name.trim()}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #71717a; vertical-align: top;">Phone</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #18181b;">${phone}</td>
                    </tr>
                    ${message?.trim() ? `
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #71717a; vertical-align: top;">Message</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #18181b;">${message.trim()}</td>
                    </tr>
                    ` : ''}
                  </table>
                </div>
                
                <p style="color: #71717a; font-size: 13px; line-height: 1.6; margin: 0;">
                  If you have any urgent queries, feel free to call us at 
                  <a href="tel:+918698037909" style="color: #18181b; font-weight: 600; text-decoration: none;">+91 8698037909</a>.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #09090b; padding: 20px 24px; text-align: center;">
                <p style="color: #52525b; font-size: 11px; margin: 0; line-height: 1.6;">
                  © ${new Date().getFullYear()} Ramdas Yadav Associates — Satara, Maharashtra
                </p>
              </div>
            </div>
          `,
        });

        // Log the result for debugging
        console.log('Email send result:', JSON.stringify(emailResult));
      } catch (emailError) {
        // Don't fail the enquiry if email fails — log full error
        console.error('Email send failed:', JSON.stringify(emailError));
      }
    }

    return Response.json({
      success: true,
      enquiry_id: enquiryId,
      message: 'Enquiry submitted successfully.',
    });
  } catch (error: unknown) {
    console.error('Enquiry submission error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
