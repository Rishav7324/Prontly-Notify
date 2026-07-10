import type { SendEmailParams } from "./index";
import type { TransportOptions } from "nodemailer";

let transporter: any = null;

async function getTransporter() {
  if (transporter) return transporter;

  const nodemailer = await import("nodemailer");

  const host = process.env.SMTP_HOST;
  if (!host) throw new Error("SMTP_HOST is required");

  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const pool = process.env.SMTP_POOL === "true";

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    pool,
    maxConnections: parseInt(process.env.SMTP_MAX_CONNECTIONS || "5", 10),
    maxMessages: parseInt(process.env.SMTP_MAX_MESSAGES || "100", 10),
    connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT || "120000", 10),
    greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT || "30000", 10),
    socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT || "600000", 10),
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
    tls: process.env.SMTP_REJECT_UNAUTHORIZED === "false"
      ? { rejectUnauthorized: false }
      : undefined,
  } as TransportOptions);

  return transporter;
}

export async function sendViaSmtp(params: SendEmailParams) {
  const tr = await getTransporter();
  const from = process.env.EMAIL_FROM || "Prontly <noreply@prontly.com>";

  const info = await tr.sendMail({
    from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (info.rejected && info.rejected.length > 0) {
    console.warn("[EMAIL] Some recipients rejected:", info.rejected);
    if (info.rejectedErrors) {
      for (const err of info.rejectedErrors) {
        console.warn(`  ${err.recipient}: ${err.message}`);
      }
    }
  }
}
