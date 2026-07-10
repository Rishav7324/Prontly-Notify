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

interface VerifyEmailProps {
  name: string;
  verifyLink: string;
}

export function VerifyEmail({ name, verifyLink }: VerifyEmailProps) {
  return (
    <EmailLayout preview="Verify your email to get started with Prontly Notify">
      <Heading style={heading}>Verify your email to get started</Heading>

      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Thanks for creating a Prontly Notify account! Click the button below
        to verify your email address and unlock all features.
      </Text>

      <Section style={buttonSection}>
        <Button href={verifyLink} style={button}>
          Verify Email Address
        </Button>
      </Section>

      <Text style={fallbackText}>
        If the button doesn't work, copy and paste this link into your browser:
      </Text>
      <Link href={verifyLink} style={fallbackLink}>
        {verifyLink}
      </Link>

      <Text style={{ ...paragraph, marginTop: "16px", fontSize: "13px", color: "#a59f97" }}>
        If you didn't create this account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
