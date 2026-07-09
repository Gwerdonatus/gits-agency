/**
 * emails/components/EmailLayout.tsx
 * Base layout + all reusable sub-components.
 * Now includes actual logo image in header.
 */

import {
  Html, Head, Body, Container, Section,
  Row, Column, Img, Text, Link, Hr, Preview, Font,
} from "@react-email/components";
import * as React from "react";

interface EmailLayoutProps {
  preview:  string;
  children: React.ReactNode;
}

export const colors = {
  bg:          "#ffffff",
  bgMuted:     "#f8f8f8",
  bgDark:      "#0a0a0a",
  text:        "#0a0a0a",
  textMuted:   "#6b7280",
  textSubtle:  "#9ca3af",
  border:      "#e5e7eb",
  accent:      "#3b82f6",
  accentLight: "#eff6ff",
  accentDark:  "#1e40af",
  white:       "#ffffff",
};

// ── Logo URL — must be absolute, publicly accessible ──
// Drop email-logo.png in /public and Vercel serves it here.
const LOGO_URL = "https://gits.technology/email-icon.png";

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.bgMuted,
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          margin: "0",
          padding: "0",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container style={{ maxWidth: "600px", margin: "40px auto", padding: "0" }}>

          {/* ── Header ── */}
          <Section
            style={{
              backgroundColor: colors.bgDark,
              padding: "28px 40px 24px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Row>
              <Column>
                <Link href="https://gits.technology" style={{ textDecoration: "none" }}>
                  {/* Logo image — white version on dark bg */}
                  <Img
                    src={LOGO_URL}
                    alt="Gits Technology"
                    width="32"
                    height="32"
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      opacity: 0.92,
                    }}
                  />
                  {/* Wordmark below the mark */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: "13px",
                      fontWeight: "500",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      margin: "0",
                      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                    }}
                  >
                    GITS.
                  </Text>
                </Link>
              </Column>
              <Column align="right">
                <Text
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    margin: "0",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  gits.technology
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body ── */}
          <Section
            style={{
              backgroundColor: colors.bg,
              padding: "40px 40px 32px",
            }}
          >
            {children}
          </Section>

          {/* ── Footer ── */}
          <Section
            style={{
              backgroundColor: colors.bg,
              borderTop: `1px solid ${colors.border}`,
              padding: "24px 40px 32px",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <Hr style={{ borderColor: colors.border, margin: "0 0 20px" }} />
            <Row>
              <Column>
                <Text
                  style={{
                    color: colors.textSubtle,
                    fontSize: "11px",
                    margin: "0 0 4px",
                    lineHeight: "1.6",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  Gits Technology — Gwer Intelligent Tech Solutions
                </Text>
                <Text
                  style={{
                    color: colors.textSubtle,
                    fontSize: "11px",
                    margin: "0",
                    lineHeight: "1.6",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  Abuja, Nigeria · Remote-first · Available worldwide
                </Text>
              </Column>
              <Column align="right">
                <Link
                  href="https://gits.technology"
                  style={{
                    color: colors.textSubtle,
                    fontSize: "11px",
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "4px",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  gits.technology
                </Link>
                <Link
                  href="mailto:hello@gits.technology"
                  style={{
                    color: colors.textSubtle,
                    fontSize: "11px",
                    textDecoration: "none",
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  hello@gits.technology
                </Link>
              </Column>
            </Row>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Sub-components — identical to before ─────────────

export function EmailHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ color: colors.text, fontSize: "22px", fontWeight: "500", lineHeight: "1.3", margin: "0 0 8px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", letterSpacing: "-0.02em" }}>
      {children}
    </Text>
  );
}

export function EmailLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ color: colors.textSubtle, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      {children}
    </Text>
  );
}

export function EmailBody({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <Text style={{ color: muted ? colors.textMuted : colors.text, fontSize: "14px", lineHeight: "1.7", margin: "0 0 16px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      {children}
    </Text>
  );
}

export function EmailDataRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Column style={{ width: "140px", verticalAlign: "top" }}>
        <Text style={{ color: colors.textSubtle, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          {label}
        </Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text style={{ color: colors.text, fontSize: "13px", margin: "0", lineHeight: "1.5", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          {value}
        </Text>
      </Column>
    </Row>
  );
}

export function EmailDataCard({ children }: { children: React.ReactNode }) {
  return (
    <Section style={{ backgroundColor: colors.bgMuted, border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "20px 24px", margin: "20px 0" }}>
      {children}
    </Section>
  );
}

export function EmailRefPill({ refId }: { refId: string }) {
  return (
    <Section style={{ backgroundColor: colors.bgDark, borderRadius: "8px", padding: "12px 20px", margin: "20px 0" }}>
      <Row>
        <Column>
          <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 2px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
            Reference ID
          </Text>
          <Text style={{ color: colors.white, fontSize: "13px", fontWeight: "500", fontFamily: "'Courier New', monospace", letterSpacing: "0.08em", margin: "0" }}>
            {refId}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

export function EmailButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ display: "inline-block", backgroundColor: colors.bgDark, color: colors.white, fontSize: "13px", fontWeight: "500", textDecoration: "none", padding: "12px 24px", borderRadius: "8px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      {children}
    </Link>
  );
}

export function EmailBadge({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ display: "inline-block", backgroundColor: colors.accentLight, color: colors.accentDark, fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "100px", letterSpacing: "0.04em", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", margin: "0 0 16px" }}>
      {children}
    </Text>
  );
}

export function EmailDivider({ label }: { label?: string }) {
  if (label) {
    return (
      <Row style={{ margin: "24px 0" }}>
        <Column style={{ borderBottom: `1px solid ${colors.border}`, verticalAlign: "middle" }} />
        <Column style={{ padding: "0 12px", whiteSpace: "nowrap" }}>
          <Text style={{ color: colors.textSubtle, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
            {label}
          </Text>
        </Column>
        <Column style={{ borderBottom: `1px solid ${colors.border}`, verticalAlign: "middle" }} />
      </Row>
    );
  }
  return <Hr style={{ borderColor: colors.border, margin: "24px 0" }} />;
}

// ── Unsubscribe footer link ───────────────────────────
// Used in newsletter emails only.
export function EmailUnsubscribeFooter({ token }: { token: string }) {
  const unsubUrl = `https://gits.technology/api/unsubscribe?token=${token}`;
  return (
    <Section style={{ marginTop: "24px", textAlign: "center" }}>
      <Hr style={{ borderColor: colors.border, margin: "0 0 16px" }} />
      <Text
        style={{
          color: colors.textSubtle,
          fontSize: "11px",
          margin: "0",
          lineHeight: "1.6",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          textAlign: "center",
        }}
      >
        You're receiving this because you subscribed at gits.technology.{" "}
        <Link
          href={unsubUrl}
          style={{
            color: colors.textSubtle,
            textDecoration: "underline",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          Unsubscribe
        </Link>
      </Text>
    </Section>
  );
}