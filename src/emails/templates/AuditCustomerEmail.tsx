/**
 * emails/templates/AuditCustomerEmail.tsx
 * Confirmation → submitter (from audit@gits.technology)
 */

import * as React from "react";
import { Section, Text } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailRefPill,
  EmailDivider, EmailBadge, EmailButton, colors,
} from "../components/EmailLayout";

export interface AuditCustomerEmailProps {
  email:   string;
  website: string;
  refId:   string;
}

export default function AuditCustomerEmail({
  email = "jane@example.com", website = "https://example.com", refId = "GITS-ABCD1234",
}: AuditCustomerEmailProps) {
  return (
    <EmailLayout preview="Your free audit is in the queue — expect it within 24–72 hours.">
      <EmailLabel>Audit request received</EmailLabel>
      <EmailHeading>Your audit is in the queue.</EmailHeading>
      <EmailBadge>Delivery: 24–72 hours · Weekdays</EmailBadge>

      <EmailBody>We've received your website audit request and it's now in our review queue. We'll send your audit directly to this email address.</EmailBody>

      <EmailDivider label="Submission" />
      <EmailDataCard>
        <EmailDataRow label="Website"    value={website} />
        <EmailDataRow label="Email"      value={email} />
        <EmailDataRow label="Turnaround" value="24–72 hours (weekdays)" />
        <EmailDataRow label="Status"     value="In review queue" />
      </EmailDataCard>

      <EmailRefPill refId={refId} />
      <EmailBody muted>Keep this reference ID handy — use it if you need to follow up.</EmailBody>

      <EmailDivider label="What you'll receive" />
      <Section style={{ margin: "0 0 20px" }}>
        {[
          "Conversion friction — where users hesitate or leave",
          "UX clarity issues — confusing copy, layout, hierarchy",
          "Quick wins — the highest-impact fixes to act on first",
          "A short prioritized roadmap",
        ].map((item) => (
          <Text key={item} style={{ color: colors.text, fontSize: "13px", margin: "0 0 8px", lineHeight: "1.6", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", paddingLeft: "14px" }}>
            — {item}
          </Text>
        ))}
      </Section>

      <EmailDivider />
      <Section style={{ marginBottom: "8px" }}>
        <Text style={{ color: colors.textSubtle, fontSize: "12px", lineHeight: "1.6", margin: "0 0 16px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          Have a specific project in mind? Let's talk.
        </Text>
        <EmailButton href="https://gits.technology/contact">Get in touch →</EmailButton>
      </Section>

      <EmailDivider />
      <EmailBody muted>
        Didn't submit this? You can safely ignore this email. Questions? Reply directly or email <strong>audit@gits.technology</strong>.
      </EmailBody>
    </EmailLayout>
  );
}