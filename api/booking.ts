import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, date, ritual } = req.body;

  if (!name || !email || !phone || !date || !ritual) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Veraxis Privé <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL || 'hello@veraxisprive.ae'],
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request - Veraxis Privé</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Ritual:</strong> ${ritual}</p>
      `,
    });

    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
}
