import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { defaultIntro, toInvitationPayload, type CreateInvitationInput } from '@/lib/invitations';
import { generateInvitationToken } from '@/lib/tokens';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function parseCreateInvitationInput(body: unknown): CreateInvitationInput | null {
  if (!body || typeof body !== 'object') return null;

  const data = body as Record<string, unknown>;
  const required = [
    'receiverName',
    'greeting',
    'question',
    'date',
    'time',
    'locationName',
    'locationAddress',
  ] as const;

  for (const field of required) {
    if (!isNonEmptyString(data[field])) return null;
  }

  const receiverName = (data.receiverName as string).trim();
  const greeting = (data.greeting as string).trim();
  const question = (data.question as string).trim();
  const date = (data.date as string).trim();
  const time = (data.time as string).trim();
  const locationName = (data.locationName as string).trim();
  const locationAddress = (data.locationAddress as string).trim();

  const itinerary = Array.isArray(data.itinerary)
    ? data.itinerary
        .filter(
          (item): item is { time: string; title: string; description: string } =>
            !!item &&
            typeof item === 'object' &&
            isNonEmptyString((item as Record<string, unknown>).time) &&
            isNonEmptyString((item as Record<string, unknown>).title) &&
            isNonEmptyString((item as Record<string, unknown>).description),
        )
        .map((item) => ({
          time: item.time.trim(),
          title: item.title.trim(),
          description: item.description.trim(),
        }))
    : [];

  return {
    receiverName,
    greeting,
    intro: isNonEmptyString(data.intro) ? data.intro.trim() : undefined,
    question,
    date,
    time,
    locationName,
    locationAddress,
    mapsUrl: isNonEmptyString(data.mapsUrl) ? data.mapsUrl.trim() : undefined,
    dressCode: isNonEmptyString(data.dressCode) ? data.dressCode.trim() : undefined,
    budgetNote: isNonEmptyString(data.budgetNote) ? data.budgetNote.trim() : undefined,
    personalMessage: isNonEmptyString(data.personalMessage) ? data.personalMessage.trim() : undefined,
    itinerary,
  };
}

async function createUniqueToken(prisma: ReturnType<typeof getPrisma>) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const token = generateInvitationToken();
    const existing = await prisma.invitation.findUnique({ where: { token } });
    if (!existing) return token;
  }

  throw new Error('Failed to generate a unique invitation token.');
}

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const input = parseCreateInvitationInput(body);

    if (!input) {
      return NextResponse.json({ error: 'Invalid invitation payload.' }, { status: 400 });
    }

    const token = await createUniqueToken(prisma);

    const invitation = await prisma.invitation.create({
      data: {
        token,
        receiverName: input.receiverName,
        greeting: input.greeting,
        intro: input.intro ?? defaultIntro(input.receiverName),
        question: input.question,
        date: input.date,
        time: input.time,
        locationName: input.locationName,
        locationAddress: input.locationAddress,
        mapsUrl: input.mapsUrl,
        dressCode: input.dressCode,
        budgetNote: input.budgetNote,
        personalMessage: input.personalMessage,
        itinerary: {
          create: input.itinerary?.map((item, index) => ({
            sortOrder: index,
            time: item.time,
            title: item.title,
            description: item.description,
          })),
        },
      },
      include: { itinerary: true },
    });

    const payload = toInvitationPayload(invitation);

    return NextResponse.json(
      {
        invitation: payload,
        url: `/i/${token}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/invitations failed:', error);
    return NextResponse.json({ error: 'Failed to create invitation.' }, { status: 500 });
  }
}
