import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/notifications';

const ALLOWED_CATEGORIES = ['Tanggal', 'Jam', 'Tempat', 'Aktivitas', 'Lainnya'] as const;

type RouteContext = {
  params: Promise<{ token: string }>;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;
    const body = await request.json();

    const categories = Array.isArray(body.categories)
      ? body.categories.filter(
          (category: unknown): category is (typeof ALLOWED_CATEGORIES)[number] =>
            typeof category === 'string' && ALLOWED_CATEGORIES.includes(category as (typeof ALLOWED_CATEGORIES)[number]),
        )
      : [];

    if (!isNonEmptyString(body.note)) {
      return NextResponse.json({ error: 'Suggestion note is required.' }, { status: 400 });
    }

    if (token === 'demo') {
      const origin = request.headers.get('origin') || new URL(request.url).origin;
      const statusUrl = `${origin}/i/demo/status`;
      
      await sendEmailNotification({
        subject: `💡 [DEMO] Saran Baru untuk Undangan Date dari Kalu`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;">
            <h2 style="color: #059669;">[DEMO] Saran Baru Diajukan 💡</h2>
            <p>Ini adalah demo. Pasanganmu (Kalu) mengirimkan saran baru untuk rencana kencan:</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>🏷️ <strong>Kategori:</strong> ${categories.join(', ') || 'Umum'}</p>
            <p>📝 <strong>Saran:</strong> "${body.note.trim()}"</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Lihat halaman status demo di:</p>
            <a href="${statusUrl}" style="display: inline-block; background-color: #1c1917; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 9999px; font-size: 14px; font-weight: 500;">Lihat Halaman Status</a>
          </div>
        `,
      });

      return NextResponse.json(
        {
          id: 'demo-suggestion-id',
          createdAt: new Date(),
        },
        { status: 201 },
      );
    }

    const prisma = getPrisma();

    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation) {
      return NextResponse.json({ error: 'Invitation not found.' }, { status: 404 });
    }

    const suggestion = await prisma.suggestion.create({
      data: {
        invitationId: invitation.id,
        categories,
        note: body.note.trim(),
      },
    });

    // Send email notification (awaited to prevent early termination on serverless Vercel)
    const origin = request.headers.get('origin') || new URL(request.url).origin;
    const statusUrl = `${origin}/i/${invitation.token}/status`;
    
    await sendEmailNotification({
      subject: `💡 Saran Baru untuk Undangan Date dari ${invitation.receiverName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 12px;">
          <h2 style="color: #059669;">Saran Baru Diajukan 💡</h2>
          <p><strong>${invitation.receiverName}</strong> mengirimkan saran baru untuk rencana date kamu:</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>🏷️ <strong>Kategori:</strong> ${categories.join(', ') || 'Umum'}</p>
          <p>📝 <strong>Saran:</strong> "${suggestion.note}"</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Lihat saran lainnya dan status selengkapnya di:</p>
          <a href="${statusUrl}" style="display: inline-block; background-color: #1c1917; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 9999px; font-size: 14px; font-weight: 500;">Lihat Halaman Status</a>
        </div>
      `,
    });

    return NextResponse.json(
      {
        id: suggestion.id,
        createdAt: suggestion.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('POST /api/invitations/[token]/suggest failed:', error);
    return NextResponse.json({ error: 'Failed to submit suggestion.' }, { status: 500 });
  }
}
