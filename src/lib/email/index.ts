import "server-only";

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export type EmailSender = (params: SendEmailParams) => Promise<void>;

const sender: EmailSender = async (params) => {
  if (process.env.SMTP_HOST) {
    const { sendViaSmtp } = await import("./smtp");
    return sendViaSmtp(params);
  }
  console.log("[EMAIL]", JSON.stringify({ to: params.to, subject: params.subject }));
  console.log(`[EMAIL] HTML (${params.html.length} chars): ${params.html.slice(0, 200)}...`);
};

export default sender;
