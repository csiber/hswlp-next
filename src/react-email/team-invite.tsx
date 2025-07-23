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
import enMessages from '../../lang/en.json'
import { createTranslator } from '@/utils/i18n-server'

interface TeamInviteEmailProps {
  inviteLink?: string;
  recipientEmail?: string;
  teamName?: string;
  inviterName?: string;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const TeamInviteEmail = ({
  inviteLink = "https://hswlp.hu/accept-invite",
  recipientEmail = "user@example.com",
  teamName = "Team",
  inviterName = "Someone",
  t,
}: TeamInviteEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={preheader}>{t('emails.team_invite.heading', { siteName: SITE_DOMAIN })}</Heading>
          <Text style={paragraph}>{t('emails.team_invite.greeting')}</Text>
          <Text style={paragraph}>
            {t('emails.team_invite.intro', { inviterName, teamName, siteName: SITE_DOMAIN })}
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={inviteLink}>
              {t('emails.team_invite.action')}
            </Link>
          </Section>
          <Text style={paragraph}>
            {t('emails.team_invite.sent_to', { email: recipientEmail })}
          </Text>
          <Text style={paragraph}>
            {t('emails.team_invite.copy_link')}
          </Text>
          <Text style={link}>{inviteLink}</Text>
          <Text style={paragraph}>
            {t('emails.team_invite.not_expected')}
          </Text>
        </Container>
        <Text style={footer}>
          {t('emails.team_invite.footer', { siteName: SITE_DOMAIN })}
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
  t: createTranslator(enMessages),
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
