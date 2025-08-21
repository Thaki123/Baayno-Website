import nodemailer from 'nodemailer';

type EnvVars = {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
  SMTP_TO: string;
};

let transporter: nodemailer.Transporter | null = null;

function validateEnv(): EnvVars {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
  } = process.env;

  const missing = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'SMTP_TO',
  ].filter((key) => !process.env[key as keyof EnvVars]);

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }

  return {
    SMTP_HOST: SMTP_HOST!,
    SMTP_PORT: SMTP_PORT!,
    SMTP_USER: SMTP_USER!,
    SMTP_PASS: SMTP_PASS!,
    SMTP_FROM: SMTP_FROM!,
    SMTP_TO: SMTP_TO!,
  };
}

export default function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const env = validateEnv();
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT, 10) || 587,
      secure: parseInt(env.SMTP_PORT, 10) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return transporter;
}
