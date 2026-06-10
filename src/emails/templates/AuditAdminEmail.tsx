/**
 * emails/templates/AuditAdminEmail.tsx
 * Admin notification → audit@gits.technology
 */

import * as React from "react";
import { Section, Text, Link } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailRefPill,
  EmailDivider, EmailBadge, colors,
} from "../components/EmailLayout";

export interface AuditAdminEmailProps {
  website:   string;
  email:     string;
  industry?: string;
  goal?:     string;
  notes?:    string;
  refId:     string;
  timestamp: string;
}

export default function AuditAdminEmail({
  website = "https://example.com", email = "jane@example.com",
  industry, goal, notes,
  refId = "GITS-ABCD1234", timestamp = "8 June 2025, 10:30 WAT",
}: AuditAdminEmailProps) {
  return (
    <EmailLayout preview={`New audit request: ${website}`}>
      <EmailLabel>New audit request</EmailLabel>
      <EmailHeading>Website audit submitted</EmailHeading>
      <EmailBadge>Deliver within 24–72 hours</EmailBadge>
      <EmailBody muted>A new website audit request has arrived via gits.technology/audit.</EmailBody>

      <EmailDivider label="Website" />
      <Section style={{ backgroundColor: colors.bgMuted, border: `1px solid ${colors.border}`, borderRadius: "8px", padding: "16px 20px", margin: "0 0 20px" }}>
        <Text style={{ color: colors.textSubtle, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          URL to audit
        </Text>
        <Link href={website} style={{ color: colors.accent, fontSize: "14px", fontWeight: "500", textDecoration: "none", wordBreak: "break-all", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          {website}
        </Link>
      </Section>

      <EmailDivider label="Requester" />
      <EmailDataCard>
        <EmailDataRow label="Email"    value={email} />
        {industry ? <EmailDataRow label="Industry" value={industry} /> : null}
        {goal     ? <EmailDataRow label="Goal"     value={goal}     /> : null}
      </EmailDataCard>

      {notes ? (
        <>
          <EmailDivider label="Notes" />
          <Section style={{ backgroundColor: colors.bgMuted, border: `1px solid ${colors.border}`, borderLeft: `3px solid ${colors.bgDark}`, borderRadius: "4px", padding: "16px 20px", margin: "0 0 20px" }}>
            <Text style={{ color: colors.text, fontSize: "13px", lineHeight: "1.7", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", whiteSpace: "pre-wrap" }}>
              {notes}
            </Text>
          </Section>
        </>
      ) : null}

      <EmailRefPill refId={refId} />
      <EmailBody muted>Submitted: {timestamp}</EmailBody>
    </EmailLayout>
  );
}