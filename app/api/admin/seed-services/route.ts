import { adminDb } from '@/lib/firebase-admin';
import { type NextRequest } from 'next/server';

const INITIAL_SERVICES = [
  {
    service_id: 'pvt-ltd-registration',
    service_name: 'Private Limited Company Registration',
    service_category: 'Registration',
    service_description:
      'Complete company incorporation solution for startups and growing businesses with end-to-end legal and compliance support.',
    service_price: 799900, // ₹7,999 in paise
    service_type: 'fixed',
    icon: 'domain',
    slug: 'private-limited-company-registration',
    points: [
      'Name approval & incorporation process',
      'MoA & AoA drafting',
      'PAN & TAN application filing',
      'Bank account setup assistance',
    ],
    isActive: true,
  },
  {
    service_id: 'llp-registration',
    service_name: 'LLP Registration',
    service_category: 'Registration',
    service_description:
      'A flexible and low-compliance business structure ideal for professionals and small businesses.',
    service_price: 599900, // ₹5,999 in paise
    service_type: 'fixed',
    icon: 'handshake',
    slug: 'llp-registration',
    points: [
      'LLP agreement drafting & vetting',
      'MCA registration process handling',
      'DIN & DSC assistance',
      'Post-incorporation compliance guidance',
    ],
    isActive: true,
  },
  {
    service_id: 'partnership-registration',
    service_name: 'Partnership Firm Registration',
    service_category: 'Registration',
    service_description:
      'A simple and cost-effective business structure for businesses with multiple owners.',
    service_price: 399900, // ₹3,999 in paise
    service_type: 'fixed',
    icon: 'group',
    slug: 'partnership-firm-registration',
    points: [
      'Partnership deed drafting and notarization',
      'Registration support with Registrar of Firms',
      'Legal and structural compliance guidance',
    ],
    isActive: true,
  },
  {
    service_id: 'proprietorship-registration',
    service_name: 'Proprietorship Registration',
    service_category: 'Registration',
    service_description:
      'The quickest and simplest way to start a business for individuals with minimal compliance.',
    service_price: 199900, // ₹1,999 in paise
    service_type: 'fixed',
    icon: 'person',
    slug: 'proprietorship-registration',
    points: [
      'GST registration mapping and support',
      'Shop Act (Gumasta) License registration',
      'Initial business setup guidance',
    ],
    isActive: true,
  },
];

// POST /api/admin/seed-services
export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const batch = adminDb.batch();

    for (const service of INITIAL_SERVICES) {
      const docRef = adminDb.collection('services').doc(service.service_id);
      batch.set(docRef, service, { merge: true });
    }

    await batch.commit();

    return Response.json({
      success: true,
      message: `${INITIAL_SERVICES.length} services seeded successfully.`,
      services: INITIAL_SERVICES.map((s) => ({
        id: s.service_id,
        name: s.service_name,
        price: `₹${(s.service_price / 100).toLocaleString('en-IN')}`,
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
