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

interface Translator {
  (key: string, params?: Record<string, string | number>): string
}

interface ResetPasswordEmailProps {
  resetLink?: string;
  username?: string;
  t: Translator;
}

export const ResetPasswordEmail = ({
  resetLink = "https://hswlp.hu/reset-password",
  username = "User",
  t,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={preheader}>{t('emails.reset_password.heading', { siteName: SITE_DOMAIN })}</Heading>
        <Text style={paragraph}>{t('emails.reset_password.greeting', { username })}</Text>
        <Text style={paragraph}>
          {t('emails.reset_password.intro', { siteName: SITE_DOMAIN })}
        </Text>
        <Section style={buttonContainer}>
          <Link style={button} href={resetLink}>
            {t('emails.reset_password.action')}
          </Link>
        </Section>
        <Text style={paragraph}>
          {t('emails.reset_password.ignore', { siteName: SITE_DOMAIN })}
        </Text>
        <Text style={paragraph}>
          {t('emails.reset_password.copy_link')}
        </Text>
        <Text style={link}>{resetLink}</Text>
      </Container>
      <Text style={footer}>
        {t('emails.reset_password.footer', { siteName: SITE_DOMAIN })}
      </Text>
    </Body>
  </Html>
);

ResetPasswordEmail.PreviewProps = {
  resetLink: "https://example.com/reset-password?token=123",
  username: "johndoe",
  t: createTranslator(enMessages),
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
