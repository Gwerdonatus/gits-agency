/**
 * emails/templates/NewsletterWelcomeEmail.tsx
 * Now includes unsubscribe link.
 */

import * as React from "react";
import { Section, Text } from "@react-email/components";
import {
  EmailLayout, EmailLabel, EmailHeading, EmailBody,
  EmailDivider, EmailButton, EmailBadge,
  EmailUnsubscribeFooter, colors,
} from "../components/EmailLayout";

export interface NewsletterWelcomeEmailProps {
  email:           string;
  unsubscribeToken: string;
}

export default function NewsletterWelcomeEmail({
  email            = "jane@example.com",
  unsubscribeToken = "preview-token",
}: NewsletterWelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to Gits Technology — you're on the list.">
      <EmailLabel>Newsletter</EmailLabel>
      <EmailHeading>You're on the list.</EmailHeading>
      <EmailBadge>Welcome to Gits Technology</EmailBadge>

      <EmailBody>
        Thanks for subscribing. You've joined a small group of founders, developers,
        and product teams who want to build better digital experiences.
      </EmailBody>

      <EmailDivider label="What you'll hear about" />

      <Section style={{ margin: "0 0 20px" }}>
        {[
          { title: "Build insights",        desc: "What we're building, how we think, and the decisions behind our work." },
          { title: "Design & Engineering",  desc: "Practical techniques we use on real client projects."                  },
          { title: "Industry observations", desc: "Short takes on what's shifting in web, AI, and product development."   },
        ].map(({ title, desc }) => (
          <Section key={title} style={{ marginBottom: "16px" }}>
            <Text style={{ color: colors.text, fontSize: "13px", fontWeight: "500", margin: "0 0 3px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              {title}
            </Text>
            <Text style={{ color: colors.textMuted, fontSize: "13px", lineHeight: "1.6", margin: "0", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
              {desc}
            </Text>
          </Section>
        ))}
      </Section>

      <EmailDivider />

      <Section style={{ marginBottom: "8px" }}>
        <Text style={{ color: colors.textMuted, fontSize: "12px", lineHeight: "1.6", margin: "0 0 16px", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
          In the meantime, explore what we build:
        </Text>
        <EmailButton href="https://gits.technology/projects">
          View our work →
        </EmailButton>
      </Section>

      <EmailDivider />

      <EmailBody muted>
        We keep it low-frequency — no spam, no filler.
      </EmailBody>

      {/* Real one-click unsubscribe link */}
      <EmailUnsubscribeFooter token={unsubscribeToken} />

    </EmailLayout>
  );
}