import "server-only";

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export type EmailSender = (params: SendEmailParams) => Promise<void>;

const sender: EmailSender = async (params) => {
  if (process.env.BREVO_API_KEY) {
    const { sendTransactionalEmail } = await import("./brevo-client");
    await sendTransactionalEmail({
      to: [{ email: params.to }],
      subject: params.subject,
      htmlContent: params.html,
    });
    return;
  }

  if (process.env.SMTP_HOST) {
    const { sendViaSmtp } = await import("./smtp");
    return sendViaSmtp(params);
  }

  console.log("[EMAIL]", JSON.stringify({ to: params.to, subject: params.subject }));
  console.log(`[EMAIL] HTML (${params.html.length} chars)`);
};

export default sender;
