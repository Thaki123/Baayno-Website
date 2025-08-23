import type { NextApiRequest, NextApiResponse } from 'next';
import getTransporter from '../../lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    const transporter = getTransporter();
    if (!transporter) {
      res.status(503).json({ error: 'Email service not configured.' });
    } else {
      res.status(200).json({ message: 'Email service configured.' });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body as { name: string; email: string; message: string };

  const transporter = getTransporter();
  if (!transporter) {
    res.status(503).json({ error: 'Email service not configured.' });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: 'New Contact Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
}
