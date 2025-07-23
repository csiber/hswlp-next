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

interface TeamInviteEmailProps {
  inviteLink?: string;
  recipientEmail?: string;
  teamName?: string;
  inviterName?: string;
}

export const TeamInviteEmail = ({
  inviteLink = "https://hswlp.hu/accept-invite",
  recipientEmail = "user@example.com",
  teamName = "Team",
  inviterName = "Someone",
}: TeamInviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={preheader}>
            Meghívást kaptál egy csapatba a {SITE_DOMAIN} oldalon
          </Heading>
          <Text style={paragraph}>Szervusz,</Text>
          <Text style={paragraph}>
            {inviterName} meghívott, hogy csatlakozz a &quot;{teamName}&quot; csapathoz a {SITE_DOMAIN} oldalon.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={inviteLink}>
              Meghívás elfogadása
            </Link>
          </Section>
          <Text style={paragraph}>
            Ezt a meghívót a(z) {recipientEmail} címre küldtük. Ha még nincs fiókod, a meghívás elfogadása után létrehozhatod.
          </Text>
          <Text style={paragraph}>
            Ha nem működik a fenti gomb, másold be ezt a linket a böngésződ címsorába:
          </Text>
          <Text style={link}>{inviteLink}</Text>
          <Text style={paragraph}>
            Ha nem számítottál ilyen meghívóra, nyugodtan töröld ezt a levelet.
          </Text>
        </Container>
        <Text style={footer}>
          Ezt az üzenetet a {SITE_DOMAIN} küldte automatikusan. Kérjük, ne válaszolj rá.
        </Text>
      </Body>
    </Html>
  );
};

TeamInviteEmail.PreviewProps = {
  inviteLink: "https://hswlp.hu/accept-invite?token=123",
  recipientEmail: "no-reply@hswlp.hu",
  teamName: "HSWLP Team",
  inviterName: "PromNET",
} as TeamInviteEmailProps;

export default TeamInviteEmail;

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
