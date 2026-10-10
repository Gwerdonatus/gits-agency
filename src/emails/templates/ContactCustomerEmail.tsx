/**
 * emails/templates/ContactCustomerEmail.tsx
 * Confirmation → submitter (from support@gits.technology)
 */

import * as React from "react";
import { Section, Text } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailRefPill,
  EmailDivider, EmailBadge, EmailButton, colors,
} from "../components/EmailLayout";

export interface ContactCustomerEmailProps {
  name:        string;
  projectType: string;
  refId:       string;
}

export default function ContactCustomerEmail({
  name = "Jane", projectType = "Web app", refId = "GITS-ABCD1234",
}: ContactCustomerEmailProps) {
  return (
    <EmailLayout preview="Your GITS project enquiry was submitted.">
      <EmailLabel>Message received</EmailLabel>
      <EmailHeading>Your enquiry was submitted, {name.split(" ")[0]}.</EmailHeading>
      <EmailBadge>Project enquiry submitted</EmailBadge>

      <EmailBody>
        Thanks for reaching out to Gits Technology. Your enquiry was accepted for processing. This confirmation is not proof of delivery to the team inbox.
      </EmailBody>
      <EmailBody muted>
        We will review your brief and suggest the next step. If your request is time-sensitive, you can also reach us on WhatsApp.
      </EmailBody>

      <EmailDivider label="Your Submission" />
      <EmailDataCard>
        <EmailDataRow label="Name"         value={name} />
        <EmailDataRow label="Project type" value={projectType} />
        <EmailDataRow label="Status"       value="Received — under review" />
      </EmailDataCard>

      <EmailRefPill refId={refId} />

      <Section style={{ margin: "24px 0 8px" }}>
        <EmailBody muted>Keep this reference ID handy — it helps us find your submission instantly if you need to follow up.</EmailBody>
      </Section>

      <EmailDivider />

      <Section style={{ marginBottom: "8px" }}>
        <Text style={{ color: colors.textSubtle, fontSize: "12px", lineHeight: "1.6", margin: "0 0 16px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          While you wait, explore what we build:
        </Text>
        <EmailButton href="https://gits.technology/projects">View our work →</EmailButton>
      </Section>

      <EmailDivider />
      <EmailBody muted>
        Did not submit this? You can safely ignore this email. Questions? Reply directly or email <strong>support@gits.technology</strong>.
      </EmailBody>
    </EmailLayout>
  );
}
