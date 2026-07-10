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

interface ResetPasswordProps {
  resetLink: string;
}

export function ResetPassword({ resetLink }: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Prontly Notify password</Preview>
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

          <Text style={warning}>
            This link expires in 1 hour. If you didn't request this, you can
            safely ignore this email — your password won't change.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Prontly Notify — Push notification platform for publishers, SaaS, and e-commerce.
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

const warning = {
  fontSize: "13px",
  color: "#a59f97",
  marginTop: "16px",
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
