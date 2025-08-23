import nodemailer from 'nodemailer';

type EnvVars = {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
  SMTP_TO: string;
};

type ValidationResult =
  | { env: EnvVars; error?: undefined; mock?: false }
  | { env?: undefined; error: string; mock?: boolean };

let transporter: nodemailer.Transporter | null = null;

function validateEnv(): ValidationResult {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
    NODE_ENV,
    MOCK_TRANSPORT,
  } = process.env;

  const missing = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'SMTP_TO',
  ].filter((key) => !process.env[key as keyof EnvVars]);

  const isProd = NODE_ENV === 'production';
  const useMock = MOCK_TRANSPORT === 'true' || !isProd;

  if (missing.length > 0 && isProd && !useMock) {
    return { error: `Missing required env vars: ${missing.join(', ')}` };
  }

  if (missing.length > 0) {
    return { error: `Missing env vars: ${missing.join(', ')}`, mock: true };
  }

  return {
    env: {
      SMTP_HOST: SMTP_HOST!,
      SMTP_PORT: SMTP_PORT!,
      SMTP_USER: SMTP_USER!,
      SMTP_PASS: SMTP_PASS!,
      SMTP_FROM: SMTP_FROM!,
      SMTP_TO: SMTP_TO!,
    },
  };
}

export default function getTransporter(): nodemailer.Transporter | null {
  if (!transporter) {
    const result = validateEnv();
    if ('error' in result) {
      if (!result.mock) {
        console.error(result.error);
        return null;
      }
      transporter = nodemailer.createTransport({ jsonTransport: true });
      console.warn(result.error);
    } else {
      const env = result.env;
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
  }
  return transporter;
}
