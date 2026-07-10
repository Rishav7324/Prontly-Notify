import type { ReactNode } from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

const main = {
  backgroundColor: "#fdfcfc",
  fontFamily: "'Inter', system-ui, sans-serif",
  padding: "40px 16px",
};

const container = { maxWidth: "480px", margin: "0 auto" };

const logoSection = { textAlign: "center" as const, paddingBottom: "24px" };

const logo = { borderRadius: "12px" };

const hr = {
  border: "none",
  borderTop: "1px solid #ebe8e4",
  margin: "32px 0",
};

const footer = {
  fontSize: "12px",
  color: "#a59f97",
  textAlign: "center" as const,
  lineHeight: "1.5",
};

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
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

          {children}

          <Hr style={hr} />

          <Text style={footer}>
            Prontly Notify — Push notification platform for publishers, SaaS, and e-commerce.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const heading = {
  fontSize: "24px",
  fontWeight: "300",
  letterSpacing: "-0.48px",
  color: "#000000",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

export const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#777169",
  margin: "0 0 12px",
};

export const buttonSection = {
  textAlign: "center" as const,
  padding: "24px 0",
};

export const button = {
  backgroundColor: "#000000",
  color: "#fdfcfc",
  fontSize: "15px",
  fontWeight: "500",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "9999px",
  display: "inline-block",
};

export const fallbackText = {
  fontSize: "13px",
  color: "#a59f97",
  margin: "0 0 8px",
};

export const fallbackLink = {
  fontSize: "13px",
  color: "#000000",
  wordBreak: "break-all" as const,
};

export const link = { color: "#000000", fontWeight: "500" };
