import { Text, Heading, Link } from "@react-email/components";
import { EmailLayout, heading, paragraph } from "./EmailLayout";

interface PasswordChangedProps {
  name: string;
}

const linkStyle = { color: "#000000", fontWeight: "500" };

export function PasswordChanged({ name }: PasswordChangedProps) {
  return (
    <EmailLayout preview="Your Prontly Notify password has been changed">
      <Heading style={heading}>Password changed successfully</Heading>

      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Your Prontly Notify account password was just changed. If you made
        this change, no further action is needed.
      </Text>

      <Text style={paragraph}>
        If you didn't change your password, please contact our support team
        immediately at{" "}
        <a href="mailto:support@prontly.in" style={linkStyle}>
          support@prontly.in
        </a>
        .
      </Text>
    </EmailLayout>
  );
}
