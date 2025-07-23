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
import { SITE_DOMAIN } from "@/constants";

interface ResetPasswordEmailProps {
  resetLink?: string;
  username?: string;
}

export const ResetPasswordEmail = ({
  resetLink = "https://hswlp.hu/reset-password",
  username = "User",
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={preheader}>Jelszó visszaállítása a {SITE_DOMAIN}-en</Heading>
        <Text style={paragraph}>Szia {username},</Text>
        <Text style={paragraph}>
          Jelszó-visszaállítási kérést kaptunk a(z) {SITE_DOMAIN} fiókodhoz. Az alábbi gombra kattintva új jelszót adhatsz meg. Biztonsági okokból a link 1 óráig érvényes.
        </Text>
        <Section style={buttonContainer}>
          <Link style={button} href={resetLink}>
            Jelszó visszaállítása
          </Link>
        </Section>
        <Text style={paragraph}>
          Ha nem te kezdeményezted a jelszó visszaállítást, nyugodtan hagyd figyelmen kívül ezt az emailt. A(z) {SITE_DOMAIN} jelszavad változatlan marad.
        </Text>
        <Text style={paragraph}>
          Ha nem működik a fenti gomb, másold be ezt a linket a böngésződ címsorába:
        </Text>
        <Text style={link}>{resetLink}</Text>
      </Container>
      <Text style={footer}>
        Ezt az üzenetet a {SITE_DOMAIN} küldte automatikusan. Ha nem te kérted a jelszó visszaállítását, hagyd figyelmen kívül vagy lépj kapcsolatba a támogatással.
      </Text>
    </Body>
  </Html>
);

ResetPasswordEmail.PreviewProps = {
  resetLink: "https://example.com/reset-password?token=123",
  username: "johndoe",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

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
