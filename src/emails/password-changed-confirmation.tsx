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

interface PasswordChangedProps {
  name: string;
}

export function PasswordChanged({ name }: PasswordChangedProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Prontly Notify password has been changed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://notify.prontly.in/logo.svg"
              width="48"
              height="48"
              alt="Prontly Notify"
              style={logo}
            />
          </Section>

          <Heading style={heading}>Password changed successfully</Heading>

          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Your Prontly Notify account password was just changed. If you made
            this change, no further action is needed.
          </Text>

          <Text style={paragraph}>
            If you didn't change your password, please contact our support team
            immediately at{" "}
            <a href="mailto:support@prontly.in" style={link}>
              support@prontly.in
            </a>
            .
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

const link = { color: "#000000", fontWeight: "500" };

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
