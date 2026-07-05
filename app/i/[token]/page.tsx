import { notFound } from 'next/navigation';
import { InvitationExperience } from '@/features/invitation/components/InvitationExperience';
import { toInvitationPayload } from '@/lib/invitations';
import { getPrisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function InvitationPage({ params }: PageProps) {
  const { token } = await params;
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
    notFound();
  }

  return <InvitationExperience invitation={toInvitationPayload(invitation)} />;
}
