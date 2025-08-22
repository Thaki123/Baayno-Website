import type { NextApiRequest, NextApiResponse } from 'next';
import getTransporter from '../../lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, bookType, quantity, notes } = req.body as {
    name: string;
    email: string;
    bookType: string;
    quantity: string;
    notes: string;
  };

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: 'New Quote Request',
      text: `Name: ${name}\nEmail: ${email}\nBook Type: ${bookType}\nQuantity: ${quantity}\nNotes: ${notes}`,
    });
    res.status(200).json({ message: 'Quote request sent successfully.' });
  } catch (error) {
    console.error('Error sending quote email:', error);
    res.status(500).json({ error: 'Failed to send quote request.' });
  }
}
