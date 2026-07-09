/**
 * emails/templates/ContactAdminEmail.tsx
 * Admin notification → contact@gits.technology
 */

import * as React from "react";
import { Section, Text, Hr } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailRefPill,
  EmailDivider, EmailBadge, colors,
} from "../components/EmailLayout";

export interface ContactAdminEmailProps {
  name:        string;
  email:       string;
  phone?:      string;
  prefer?:     string;
  projectType: string;
  timeline:    string;
  budget:      string;
  message:     string;
  refId:       string;
  timestamp:   string;
}

export default function ContactAdminEmail({
  name = "Jane Smith", email = "jane@example.com",
  phone, prefer, projectType = "Web app",
  timeline = "2–4 weeks", budget = "$3k–$7k",
  message = "We need a dashboard...",
  refId = "GITS-ABCD1234", timestamp = "8 June 2025, 10:30 WAT",
}: ContactAdminEmailProps) {
  return (
    <EmailLayout preview={`New contact: ${name} — ${projectType}`}>
      <EmailLabel>New lead</EmailLabel>
      <EmailHeading>Contact form submission</EmailHeading>
      <EmailBadge>Requires reply within 24 hours</EmailBadge>
      <EmailBody muted>A new message arrived via the contact form on gits.technology.</EmailBody>

      <EmailDivider label="Submission Details" />
      <EmailDataCard>
        <EmailDataRow label="Name"    value={name} />
        <EmailDataRow label="Email"   value={email} />
        {phone  ? <EmailDataRow label="Phone"   value={phone} />  : null}
        {prefer ? <EmailDataRow label="Prefers" value={prefer} /> : null}
      </EmailDataCard>

      <EmailDivider label="Project Info" />
      <EmailDataCard>
        <EmailDataRow label="Type"     value={projectType} />
        <EmailDataRow label="Timeline" value={timeline} />
        <EmailDataRow label="Budget"   value={budget} />
      </EmailDataCard>

      <EmailDivider label="Message" />
      <Section style={{ backgroundColor: colors.bgMuted, border: `1px solid ${colors.border}`, borderLeft: `3px solid ${colors.bgDark}`, borderRadius: "4px", padding: "16px 20px", margin: "0 0 20px" }}>
        <Text style={{ color: colors.text, fontSize: "13px", lineHeight: "1.7", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", whiteSpace: "pre-wrap" }}>
          {message}
        </Text>
      </Section>

      <Hr style={{ borderColor: colors.border, margin: "20px 0" }} />
      <EmailRefPill refId={refId} />
      <EmailBody muted>Submitted: {timestamp}</EmailBody>
    </EmailLayout>
  );
}