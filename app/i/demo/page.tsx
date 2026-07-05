import { InvitationExperience } from '@/features/invitation/components/InvitationExperience';
import { demoInvitation } from '@/features/invitation/demo-data';

export default function DemoPage() {
  return <InvitationExperience invitation={demoInvitation} />;
}
