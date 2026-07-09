/**
 * emails/templates/NewsletterAdminEmail.tsx
 * Admin notification → hello@gits.technology on new signup
 */

import * as React from "react";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailDivider, EmailBadge,
} from "../components/EmailLayout";

export interface NewsletterAdminEmailProps {
  email:     string;
  timestamp: string;
}

export default function NewsletterAdminEmail({
  email = "jane@example.com", timestamp = "8 June 2025, 10:30 WAT",
}: NewsletterAdminEmailProps) {
  return (
    <EmailLayout preview={`New newsletter subscriber: ${email}`}>
      <EmailLabel>Newsletter</EmailLabel>
      <EmailHeading>New subscriber</EmailHeading>
      <EmailBadge>Newsletter signup</EmailBadge>
      <EmailBody muted>Someone just subscribed to the Gits Technology newsletter.</EmailBody>

      <EmailDivider label="Subscriber" />
      <EmailDataCard>
        <EmailDataRow label="Email"     value={email} />
        <EmailDataRow label="Source"    value="Footer newsletter form · gits.technology" />
        <EmailDataRow label="Timestamp" value={timestamp} />
      </EmailDataCard>
    </EmailLayout>
  );
}