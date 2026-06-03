import { adminAuth } from '@/lib/firebase-admin';
import { type NextRequest } from 'next/server';

// POST /api/admin/set-claim
// One-time use: sets isAdmin claim on a Firebase Auth user
// Body: { uid: string, secret: string }
export async function POST(request: NextRequest) {
  try {
    const { uid, secret } = await request.json();

    // Simple secret key check — prevents random API calls
    if (secret !== process.env.RAZORPAY_KEY_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!uid) {
      return Response.json({ error: 'UID is required' }, { status: 400 });
    }

    await adminAuth.setCustomUserClaims(uid, { isAdmin: true });

    return Response.json({ success: true, message: `Admin claim set for UID: ${uid}` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
