import "server-only";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface BrevoAttachment {
  name: string;
  content: string;
}

interface BrevoSendParams {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  attachment?: BrevoAttachment[];
}

export async function sendTransactionalEmail(params: BrevoSendParams) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured — emails will not be sent");
  }

  const fromEmail = process.env.EMAIL_FROM_TRANSACTIONAL || "hello@prontly.in";

  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Prontly Notify", email: fromEmail },
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
      ...(params.attachment ? { attachment: params.attachment } : {}),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Brevo API error (${res.status}): ${data.message || JSON.stringify(data)}`
    );
  }

  return { messageId: data.messageId };
}
