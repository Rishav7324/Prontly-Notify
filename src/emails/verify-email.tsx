import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Img,
  Link,
} from "@react-email/components";

interface VerifyEmailProps {
  name: string;
  verifyLink: string;
}

export function VerifyEmail({ name, verifyLink }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to get started with Prontly Notify</Preview>
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

          <Hr style={hr} />

          <Text style={footer}>
            Prontly Notify — Push notification platform for publishers, SaaS, and e-commerce.
            <br />
            If you didn't create this account, you can safely ignore this email.
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

const container = {
  maxWidth: "480px",
  margin: "0 auto",
};

const logoSection = {
  textAlign: "center" as const,
  paddingBottom: "24px",
};

const logo = {
  borderRadius: "12px",
};

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

const buttonSection = {
  textAlign: "center" as const,
  padding: "24px 0",
};

const button = {
  backgroundColor: "#000000",
  color: "#fdfcfc",
  fontSize: "15px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "9999px",
  display: "inline-block",
};

const fallbackText = {
  fontSize: "13px",
  color: "#a59f97",
  margin: "0 0 8px",
};

const fallbackLink = {
  fontSize: "13px",
  color: "#000000",
  wordBreak: "break-all" as const,
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
