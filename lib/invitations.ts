import type { Invitation as InvitationPayload, ItineraryItem } from '@/features/invitation/types';
import type { Invitation, ItineraryItem as ItineraryRecord } from '@/lib/generated/prisma/client';

export type CreateInvitationInput = {
  receiverName: string;
  greeting: string;
  intro?: string;
  question: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  mapsUrl?: string;
  dressCode?: string;
  budgetNote?: string;
  personalMessage?: string;
  itinerary?: ItineraryItem[];
};

export function defaultIntro(receiverName: string) {
  return `I've made u something, ${receiverName}. Hope u got some time to spare and read this.`;
}

export function toInvitationPayload(
  invitation: Invitation & { itinerary: ItineraryRecord[] },
): InvitationPayload {
  return {
    token: invitation.token,
    receiverName: invitation.receiverName,
    greeting: invitation.greeting,
    intro: invitation.intro,
    question: invitation.question,
    date: invitation.date,
    time: invitation.time,
    locationName: invitation.locationName,
    locationAddress: invitation.locationAddress,
    mapsUrl: invitation.mapsUrl ?? undefined,
    dressCode: invitation.dressCode ?? undefined,
    budgetNote: invitation.budgetNote ?? undefined,
    personalMessage: invitation.personalMessage ?? undefined,
    itinerary: invitation.itinerary
      .sort((a: ItineraryRecord, b: ItineraryRecord) => a.sortOrder - b.sortOrder)
      .map((item: ItineraryRecord) => ({
        time: item.time,
        title: item.title,
        description: item.description,
      })),
  };
}
