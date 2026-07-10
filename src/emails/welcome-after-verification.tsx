import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Img,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Prontly Notify — your email is verified</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://prontly.com/logo.png"
              width="48"
              height="48"
              alt="Prontly Notify"
              style={logo}
            />
          </Section>

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
            <a href="https://prontly.in/dashboard" style={link}>
              https://prontly.in/dashboard
            </a>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Prontly Notify — Push notification platform
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fdfcfc",
  fontFamily: "'Inter', system-ui, sans-serif",
  padding: "40px 16px",
};

const container = { maxWidth: "480px", margin: "0 auto" };

const logoSection = { textAlign: "center" as const, paddingBottom: "24px" };

const logo = { borderRadius: "12px" };

const heading = {
  fontSize: "24px",
  fontWeight: "300",
  letterSpacing: "-0.48px",
  color: "#000000",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#777169",
  margin: "0 0 12px",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#777169",
  margin: "0 0 6px",
  paddingLeft: "8px",
};

const link = {
  color: "#000000",
  fontWeight: "500",
};

const hr = {
  border: "none",
  borderTop: "1px solid #ebe8e4",
  margin: "32px 0",
};

const footer = {
  fontSize: "12px",
  color: "#a59f97",
  textAlign: "center" as const,
};
