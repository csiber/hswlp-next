import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import {
  EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS,
  SITE_DOMAIN,
} from "@/constants";

interface VerifyEmailProps {
  verificationLink?: string;
  username?: string;
}

export const VerifyEmail = ({
  verificationLink = "https://hswlp.hu/verify-email",
  username = "User",
}: VerifyEmailProps) => {
  const expirationHours = EMAIL_VERIFICATION_TOKEN_EXPIRATION_SECONDS / 60 / 60;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={preheader}>Erősítsd meg az email címed</Heading>
          <Text style={paragraph}>Szia {username},</Text>
          <Text style={paragraph}>
            Köszönjük, hogy regisztráltál a {SITE_DOMAIN} oldalán! A regisztráció befejezéséhez
            meg kell erősítened az email címed. Kattints az alábbi gombra a megerősítéshez.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={verificationLink}>
              Email cím megerősítése
            </Link>
          </Section>
          <Text style={paragraph}>
            Ez a megerősítő link {expirationHours} óra múlva lejár. Utána új megerősítő levelet kell kérned.
          </Text>
          <Text style={paragraph}>
            Ha nem működik a fenti gomb, másold be ezt a linket a böngésződ címsorába:
          </Text>
          <Text style={link}>{verificationLink}</Text>
          <Text style={paragraph}>
            Ha nem te hoztál létre fiókot a {SITE_DOMAIN} oldalon, nyugodtan hagyd figyelmen kívül ezt a levelet.
          </Text>
        </Container>
        <Text style={footer}>
          Ezt az üzenetet a {SITE_DOMAIN} küldte automatikusan. Kérjük, ne válaszolj rá.
        </Text>
      </Body>
    </Html>
  );
};

VerifyEmail.PreviewProps = {
  verificationLink: "https://hswlp.hu/verify-email?token=123",
  username: "PromNET",
} as VerifyEmailProps;

export default VerifyEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  marginTop: "30px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px",
};

const preheader = {
  color: "#525f7f",
  fontSize: "18px",
  textAlign: "center" as const,
  marginBottom: "30px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  marginBottom: "16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "5px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "13px 40px",
  margin: "0 auto",
};

const link = {
  color: "#556cd6",
  fontSize: "14px",
  textAlign: "center" as const,
  textDecoration: "underline",
  margin: "16px 0 30px",
  wordBreak: "break-all" as const,
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "20px 0",
};
