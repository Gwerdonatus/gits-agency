/**
 * emails/templates/ProjectEmails.tsx
 * 5 reusable project communication templates.
 * All sent from projects@gits.technology.
 */

import * as React from "react";
import { Section, Text, Link } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDataCard, EmailDataRow, EmailRefPill,
  EmailDivider, EmailBadge, EmailButton, colors,
} from "../components/EmailLayout";

// ── 1. Project Started ────────────────────────────────

export interface ProjectStartedEmailProps {
  clientName:     string;
  projectName:    string;
  projectManager: string;
  startDate:      string;
  estimatedEnd:   string;
  refId:          string;
}

export function ProjectStartedEmail({
  clientName = "Jane Smith", projectName = "Acme Dashboard",
  projectManager = "Gwer", startDate = "10 June 2025",
  estimatedEnd = "10 July 2025", refId = "GITS-PROJ0001",
}: ProjectStartedEmailProps) {
  return (
    <EmailLayout preview={`Your project "${projectName}" has kicked off — let's build.`}>
      <EmailLabel>Project started</EmailLabel>
      <EmailHeading>We've kicked off {projectName}.</EmailHeading>
      <EmailBadge>Project active</EmailBadge>
      <EmailBody>Hi {clientName.split(" ")[0]}, we're excited to start building. Your project is now active and our team is aligned on the scope and goals.</EmailBody>

      <EmailDivider label="Project Details" />
      <EmailDataCard>
        <EmailDataRow label="Project"  value={projectName} />
        <EmailDataRow label="Lead"     value={projectManager} />
        <EmailDataRow label="Start"    value={startDate} />
        <EmailDataRow label="Est. end" value={estimatedEnd} />
        <EmailDataRow label="Status"   value="Active" />
      </EmailDataCard>

      <EmailRefPill refId={refId} />
      <EmailDivider label="What's next" />
      <EmailBody muted>We'll send regular updates as milestones are reached. Your project manager will be your primary contact — you can reply to this email or reach out at <strong>projects@gits.technology</strong> any time.</EmailBody>

      <Section style={{ marginBottom: "8px" }}>
        <EmailButton href="https://gits.technology/contact">Message us →</EmailButton>
      </Section>
    </EmailLayout>
  );
}

// ── 2. Proposal Approved ──────────────────────────────

export interface ProposalApprovedEmailProps {
  clientName:  string;
  projectName: string;
  totalValue:  string;
  nextStep:    string;
  refId:       string;
}

export function ProposalApprovedEmail({
  clientName = "Jane Smith", projectName = "Acme Dashboard",
  totalValue = "$5,000",
  nextStep = "Please sign the contract and pay the 50% deposit to proceed.",
  refId = "GITS-PROP0001",
}: ProposalApprovedEmailProps) {
  return (
    <EmailLayout preview={`Proposal approved — let's get started on ${projectName}.`}>
      <EmailLabel>Proposal</EmailLabel>
      <EmailHeading>Proposal approved. Let's build.</EmailHeading>
      <EmailBadge>Approved</EmailBadge>
      <EmailBody>Hi {clientName.split(" ")[0]}, your proposal for {projectName} has been approved. We're ready to move forward.</EmailBody>

      <EmailDivider label="Agreement Summary" />
      <EmailDataCard>
        <EmailDataRow label="Project"     value={projectName} />
        <EmailDataRow label="Total value" value={totalValue} />
        <EmailDataRow label="Status"      value="Approved" />
      </EmailDataCard>

      <EmailRefPill refId={refId} />
      <EmailDivider label="Next step" />
      <Section style={{ backgroundColor: colors.bgMuted, border: `1px solid ${colors.border}`, borderLeft: `3px solid ${colors.bgDark}`, borderRadius: "4px", padding: "16px 20px", margin: "0 0 20px" }}>
        <Text style={{ color: colors.text, fontSize: "13px", lineHeight: "1.7", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          {nextStep}
        </Text>
      </Section>

      <Section style={{ marginBottom: "8px" }}>
        <EmailButton href="https://gits.technology/contact">Questions? Get in touch →</EmailButton>
      </Section>
    </EmailLayout>
  );
}

// ── 3. Project Update ─────────────────────────────────

export interface ProjectUpdateEmailProps {
  clientName:   string;
  projectName:  string;
  updateNumber: number;
  summary:      string;
  completed:    string[];
  upcoming:     string[];
  previewUrl?:  string;
  refId:        string;
}

export function ProjectUpdateEmail({
  clientName = "Jane Smith", projectName = "Acme Dashboard",
  updateNumber = 1,
  summary = "We've completed the authentication flow and are now working on the dashboard layout.",
  completed = ["User authentication", "Database schema", "API endpoints for auth"],
  upcoming  = ["Dashboard layout", "Data visualizations", "Testing"],
  previewUrl, refId = "GITS-UPD0001",
}: ProjectUpdateEmailProps) {
  return (
    <EmailLayout preview={`Update #${updateNumber} on ${projectName} — good progress.`}>
      <EmailLabel>Project update #{updateNumber}</EmailLabel>
      <EmailHeading>{projectName} — progress update.</EmailHeading>
      <EmailBadge>In progress</EmailBadge>
      <EmailBody>Hi {clientName.split(" ")[0]}, here's your latest update on {projectName}.</EmailBody>
      <EmailBody muted>{summary}</EmailBody>

      <EmailDivider label="Completed" />
      <Section style={{ margin: "0 0 20px" }}>
        {completed.map((item) => (
          <Text key={item} style={{ color: colors.text, fontSize: "13px", margin: "0 0 8px", lineHeight: "1.6", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", paddingLeft: "14px" }}>
            ✓ {item}
          </Text>
        ))}
      </Section>

      <EmailDivider label="Up next" />
      <Section style={{ margin: "0 0 20px" }}>
        {upcoming.map((item) => (
          <Text key={item} style={{ color: colors.textMuted, fontSize: "13px", margin: "0 0 8px", lineHeight: "1.6", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", paddingLeft: "14px" }}>
            → {item}
          </Text>
        ))}
      </Section>

      <EmailRefPill refId={refId} />
      {previewUrl ? (
        <Section style={{ marginBottom: "8px" }}>
          <EmailButton href={previewUrl}>View preview →</EmailButton>
        </Section>
      ) : null}

      <EmailDivider />
      <EmailBody muted>Questions or feedback? Reply to this email or reach us at <strong>projects@gits.technology</strong>.</EmailBody>
    </EmailLayout>
  );
}

// ── 4. Project Completed ──────────────────────────────

export interface ProjectCompletedEmailProps {
  clientName:   string;
  projectName:  string;
  deliveryUrl?: string;
  refId:        string;
}

export function ProjectCompletedEmail({
  clientName = "Jane Smith", projectName = "Acme Dashboard",
  deliveryUrl, refId = "GITS-DONE0001",
}: ProjectCompletedEmailProps) {
  return (
    <EmailLayout preview={`${projectName} is complete — your delivery is ready.`}>
      <EmailLabel>Project complete</EmailLabel>
      <EmailHeading>{projectName} is delivered.</EmailHeading>
      <EmailBadge>Delivered</EmailBadge>
      <EmailBody>Hi {clientName.split(" ")[0]}, your project is complete. Everything has been finalized and is ready for you to review and launch.</EmailBody>

      <EmailDivider label="Delivery" />
      <EmailDataCard>
        <EmailDataRow label="Project" value={projectName} />
        <EmailDataRow label="Status"  value="Delivered — awaiting your review" />
        <EmailDataRow label="Access"  value={deliveryUrl ?? "See email below"} />
      </EmailDataCard>

      <EmailRefPill refId={refId} />
      {deliveryUrl ? (
        <Section style={{ margin: "24px 0 8px" }}>
          <EmailButton href={deliveryUrl}>Access your delivery →</EmailButton>
        </Section>
      ) : null}

      <EmailDivider />
      <EmailBody muted>Please review everything and let us know if you have any feedback. Reply to this email or contact <strong>projects@gits.technology</strong>.</EmailBody>
    </EmailLayout>
  );
}

// ── 5. Invoice Reminder ───────────────────────────────

export interface InvoiceReminderEmailProps {
  clientName:   string;
  invoiceId:    string;
  amount:       string;
  dueDate:      string;
  paymentLink?: string;
  refId:        string;
}

export function InvoiceReminderEmail({
  clientName = "Jane Smith", invoiceId = "INV-0001",
  amount = "$2,500", dueDate = "15 June 2025",
  paymentLink, refId = "GITS-INV0001",
}: InvoiceReminderEmailProps) {
  return (
    <EmailLayout preview={`Friendly reminder: Invoice ${invoiceId} is due ${dueDate}.`}>
      <EmailLabel>Invoice reminder</EmailLabel>
      <EmailHeading>Invoice due: {invoiceId}</EmailHeading>
      <EmailBadge>Payment pending</EmailBadge>
      <EmailBody>Hi {clientName.split(" ")[0]}, this is a friendly reminder that the following invoice is coming up.</EmailBody>

      <EmailDivider label="Invoice Details" />
      <EmailDataCard>
        <EmailDataRow label="Invoice"  value={invoiceId} />
        <EmailDataRow label="Amount"   value={amount} />
        <EmailDataRow label="Due date" value={dueDate} />
        <EmailDataRow label="Status"   value="Unpaid" />
      </EmailDataCard>

      <EmailRefPill refId={refId} />
      {paymentLink ? (
        <Section style={{ margin: "24px 0 8px" }}>
          <EmailButton href={paymentLink}>Pay now →</EmailButton>
        </Section>
      ) : null}

      <EmailDivider />
      <EmailBody muted>If you've already made payment, please disregard this message. For questions, reply to this email or contact <strong>projects@gits.technology</strong>.</EmailBody>
    </EmailLayout>
  );
}