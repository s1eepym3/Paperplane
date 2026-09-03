export async function sendEmailNotification({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn('Skipping email notification: RESEND_API_KEY or NOTIFICATION_EMAIL not set in environment.');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Paperplane <onboarding@resend.dev>',
        to: toEmail,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to send email via Resend:', errorText);
    } else {
      console.log('Email notification sent successfully.');
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}
