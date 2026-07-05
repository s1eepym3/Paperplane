import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/notifications';

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (token === 'demo') {
      const origin = request.headers.get('origin') || new URL(request.url).origin;
      const statusUrl = `${origin}/i/demo/status`;
      
      await sendEmailNotification({
        subject: `❤️ [DEMO] Undangan Date Diterima oleh Kalu!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;">
            <h2 style="color: #db2777;">[DEMO] Kabar Gembira! ❤️</h2>
            <p>Ini adalah demo. Pasanganmu (Kalu) menerima undangan date.</p>
            <p>Detail Rencana Demo:</p>
            <p>📅 <strong>Tanggal:</strong> Sabtu, 20 Juli 2026</p>
            <p>⏰ <strong>Waktu:</strong> 18:30</p>
            <p>📍 <strong>Tempat:</strong> Ambrogio Patisserie (Jl. Banda No. 26, Bandung)</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Lihat halaman status demo di:</p>
            <a href="${statusUrl}" style="display: inline-block; background-color: #1c1917; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 9999px; font-size: 14px; font-weight: 500;">Lihat Halaman Status</a>
          </div>
        `,
      });

      return NextResponse.json({
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      });
    }

    const prisma = getPrisma();

    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found.' }, { status: 404 });
    }

    if (invitation.status === 'ACCEPTED') {
      return NextResponse.json({
        status: invitation.status,
        acceptedAt: invitation.acceptedAt,
      });
    }

    const accepted = await prisma.invitation.update({
      where: { token },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    // Send email notification (awaited to prevent early termination on serverless Vercel)
    const origin = request.headers.get('origin') || new URL(request.url).origin;
    const statusUrl = `${origin}/i/${accepted.token}/status`;
    
    await sendEmailNotification({
      subject: `❤️ Undangan Date Diterima oleh ${accepted.receiverName}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;">
          <h2 style="color: #db2777;">Kabar Gembira! ❤️</h2>
          <p><strong>${accepted.receiverName}</strong> baru saja menerima undangan date kamu.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #374151;">Detail Rencana:</h3>
          <p>📅 <strong>Tanggal:</strong> ${accepted.date}</p>
          <p>⏰ <strong>Waktu:</strong> ${accepted.time}</p>
          <p>📍 <strong>Tempat:</strong> ${accepted.locationName} (${accepted.locationAddress})</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Lihat status dan saran selengkapnya di:</p>
          <a href="${statusUrl}" style="display: inline-block; background-color: #1c1917; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 9999px; font-size: 14px; font-weight: 500;">Lihat Halaman Status</a>
        </div>
      `,
    });

    return NextResponse.json({
      status: accepted.status,
      acceptedAt: accepted.acceptedAt,
    });
  } catch (error) {
    console.error('POST /api/invitations/[token]/accept failed:', error);
    return NextResponse.json({ error: 'Failed to accept invitation.' }, { status: 500 });
  }
}
