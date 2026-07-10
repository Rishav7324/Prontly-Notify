import { Text, Heading, Section, Button, Link } from "@react-email/components";
import {
  EmailLayout,
  heading,
  paragraph,
  buttonSection,
  button,
  fallbackText,
  fallbackLink,
} from "./EmailLayout";

interface ResetPasswordProps {
  resetLink: string;
}

export function ResetPassword({ resetLink }: ResetPasswordProps) {
  return (
    <EmailLayout preview="Reset your Prontly Notify password">
      <Heading style={heading}>Reset your password</Heading>

      <Text style={paragraph}>
        We received a request to reset the password for your Prontly Notify
        account. Click the button below to set a new password.
      </Text>

      <Section style={buttonSection}>
        <Button href={resetLink} style={button}>
          Reset Password
        </Button>
      </Section>

      <Text style={fallbackText}>
        If the button doesn't work, copy and paste this link into your browser:
      </Text>
      <Link href={resetLink} style={fallbackLink}>
        {resetLink}
      </Link>

      <Text style={{ ...paragraph, marginTop: "16px", fontSize: "13px", color: "#a59f97" }}>
        This link expires in 1 hour. If you didn't request this, you can
        safely ignore this email — your password won't change.
      </Text>
    </EmailLayout>
  );
}
