import type { Invitation } from '@/features/invitation/types';

export const demoInvitation: Invitation = {
  token: 'demo',
  receiverName: 'Someone Special',
  greeting: 'Hello, Someone Special',
  intro: 'I got something for u. hope u spare some time to read this.',
  question: 'Lets go on a date',
  date: 'Sabtu, 20 Juli 2026',
  time: '19:30',
  locationName: 'J.Co Suzuya Lhokseumawe',
  locationAddress: 'Jl. Medan - Banda Aceh No. 26, Suzuya Lhokseumawe',
  mapsUrl: 'https://maps.google.com',
  dressCode: 'Casual cute, yang penting nyaman.',
  budgetNote: 'Tenang, kali ini aku yang handle.',
  personalMessage: 'chill, i will it handle it.',
  itinerary: [
    { time: '18:30', title: 'Meet up', description: 'Ketemu di tempat pertama, mulai dengan ngobrol santai.' },
    { time: '19:00', title: 'Dinner', description: 'Makan malam pelan-pelan, tanpa harus buru-buru.' },
    { time: '20:30', title: 'Little walk', description: 'Jalan sebentar setelah dinner kalau kamu masih mau.' },
    { time: '21:00', title: 'A small surprise', description: 'Ada detail kecil yang aku simpan buat nanti.' },
  ],
};
