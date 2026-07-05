import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { toInvitationPayload } from '@/lib/invitations';

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;
    const prisma = getPrisma();

    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: {
        itinerary: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found.' }, { status: 404 });
    }

    return NextResponse.json({
      invitation: toInvitationPayload(invitation),
      status: invitation.status,
      acceptedAt: invitation.acceptedAt,
    });
  } catch (error) {
    console.error('GET /api/invitations/[token] failed:', error);
    return NextResponse.json({ error: 'Failed to load invitation.' }, { status: 500 });
  }
}
