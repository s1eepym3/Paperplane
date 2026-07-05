import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../lib/generated/prisma/client';
import { demoInvitation } from '../features/invitation/demo-data';

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DIRECT_URL or DATABASE_URL must be set to run the seed.');
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.suggestion.deleteMany();
  await prisma.itineraryItem.deleteMany();
  await prisma.invitation.deleteMany({ where: { token: 'demo' } });

  await prisma.invitation.create({
    data: {
      token: demoInvitation.token,
      receiverName: demoInvitation.receiverName,
      greeting: demoInvitation.greeting,
      intro: demoInvitation.intro,
      question: demoInvitation.question,
      date: demoInvitation.date,
      time: demoInvitation.time,
      locationName: demoInvitation.locationName,
      locationAddress: demoInvitation.locationAddress,
      mapsUrl: demoInvitation.mapsUrl,
      dressCode: demoInvitation.dressCode,
      budgetNote: demoInvitation.budgetNote,
      personalMessage: demoInvitation.personalMessage,
      itinerary: {
        create: demoInvitation.itinerary.map((item, index) => ({
          sortOrder: index,
          time: item.time,
          title: item.title,
          description: item.description,
        })),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeded demo invitation.');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
