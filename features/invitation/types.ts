export type ItineraryItem = {
  time: string;
  title: string;
  description: string;
};

export type Invitation = {
  token: string;
  receiverName: string;
  greeting: string;
  intro: string;
  question: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  mapsUrl?: string;
  dressCode?: string;
  budgetNote?: string;
  personalMessage?: string;
  itinerary: ItineraryItem[];
};

export type InvitationScene = 'greeting' | 'question' | 'celebration' | 'envelope' | 'plan';
