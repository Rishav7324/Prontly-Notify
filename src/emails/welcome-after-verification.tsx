import { Text, Heading, Link } from "@react-email/components";
import { EmailLayout, heading, paragraph, link } from "./EmailLayout";

interface WelcomeEmailProps {
  name: string;
}

const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#777169",
  margin: "0 0 6px",
  paddingLeft: "8px",
};

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to Prontly Notify — your email is verified">
      <Heading style={heading}>Email verified! Welcome aboard 🎉</Heading>

      <Text style={paragraph}>Hi {name},</Text>
      <Text style={paragraph}>
        Your email has been verified and your account is fully active.
        Here's what you can do next:
      </Text>

      <Text style={listItem}>1. Add your first website to start collecting subscribers</Text>
      <Text style={listItem}>2. Create a welcome notification campaign</Text>
      <Text style={listItem}>3. Explore AI-powered tools for CTR optimization</Text>

      <Text style={paragraph}>
        Visit your dashboard to get started:
        <br />
        <a href="https://notify.prontly.in/dashboard" style={link}>
          https://notify.prontly.in/dashboard
        </a>
      </Text>
    </EmailLayout>
  );
}
