import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: parseInt(process.env.SMTP_PORT, 10) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, bookType, quantity, notes } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: 'New Quote Request',
      text: `Name: ${name}\nEmail: ${email}\nBook Type: ${bookType}\nQuantity: ${quantity}\nNotes: ${notes}`,
    });
    return res.status(200).json({ message: 'Quote request sent successfully.' });
  } catch (error) {
    console.error('Error sending quote email:', error);
    return res.status(500).json({ error: 'Failed to send quote request.' });
  }
}

