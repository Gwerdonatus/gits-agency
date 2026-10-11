"use client";
import { useState } from "react";
import { DemoShell, Badge, Empty } from "./DemoShell";
type Kind = "meridian" | "nexus" | "bridgepoint";
interface Message {
  from: "user" | "agent";
  text: string;
  source?: string;
}
interface Scenario {
  id: string;
  title: string;
  source: string;
  messages: Message[];
  action: string;
  recipient: string;
  confirmation: string;
  resolution: string;
}
const scenarios: Record<Kind, Scenario[]> = {
  meridian: [
    {
      id: "maintenance",
      title: "No hot water",
      source:
        "Fictional HMO Maintenance SOP · §4.2. For this example, loss of hot water is urgent. Log the issue, check the approved contractor list, obtain manager approval and follow up with the tenant.",
      messages: [
        {
          from: "user",
          text: "What's our process if a tenant in an HMO reports no hot water?",
        },
        {
          from: "agent",
          text: "In the sample HMO Maintenance SOP, this is Priority 1. I would log an urgent repair and check the approved contractor list. First: which property is affected, and is there any sign of a leak or electrical hazard?",
          source: "Sample HMO Maintenance SOP · §4.2",
        },
        {
          from: "user",
          text: "14 Cedar House. No leak or electrical issue reported. All taps are cold.",
        },
        {
          from: "agent",
          text: "I have drafted ticket M-104 for Cedar House and selected Cedar Plumbing from the sample approved list. The proposed message includes the address, symptoms and a request for the earliest appointment. The manager can review it before dispatch.",
        },
      ],
      action: "Urgent repair request M-104",
      recipient: "Cedar Plumbing · sample approved contractor",
      confirmation:
        "Cedar Plumbing has acknowledged the sample request and offered 10:00–12:00. The tenant update includes that window and ticket M-104.",
      resolution:
        "The sample contractor report says hot water was restored. The tenant confirmed the taps are working. Ticket M-104 is marked resolved, with the review and appointment history retained.",
    },
    {
      id: "rent",
      title: "Rent & reminders",
      source:
        "Fictional tenancy ledger · Cedar House. Sample rent £925, due on the 1st. Use the existing portal details. A reminder requires the tenant’s preference; do not invent payment confirmation.",
      messages: [
        { from: "user", text: "When is my rent due this month?" },
        {
          from: "agent",
          text: "The sample tenancy record shows £925 due on the 1st. Use the payment details in your existing tenant portal. Would you like a reminder three days before it is due?",
          source: "Sample tenancy ledger · Cedar House",
        },
        { from: "user", text: "Yes. Please remind me by message." },
        {
          from: "agent",
          text: "I have prepared a reminder for the 28th, using your selected message preference. A team member can review the reminder before it is added to the sample queue. This does not collect a payment.",
        },
      ],
      action: "Rent reminder R-028",
      recipient: "Tenant reminder queue · sample message channel",
      confirmation:
        "The reminder is scheduled in the sample queue for the 28th. The tenant can see its date and purpose. No rent payment is marked received.",
      resolution:
        "The sample reminder has been acknowledged. Its activity is recorded; the rent balance is unchanged until a verified payment record is available.",
    },
    {
      id: "unknown",
      title: "Human review",
      source:
        "No insurance policy is supplied in this example. The team guide directs coverage questions to the property manager and the current policy document.",
      messages: [
        {
          from: "user",
          text: "Will the building insurance pay for my damaged belongings?",
        },
        {
          from: "agent",
          text: "The supplied sample documents do not establish that. I should not guess about coverage. I can prepare a question for the property manager and request the relevant policy.",
          source: "Sample document coverage check · no supporting policy",
        },
        {
          from: "user",
          text: "Please ask the manager what information they need.",
        },
        {
          from: "agent",
          text: "The draft asks for the current policy and the information needed to review your question. It does not promise reimbursement or make an insurance decision.",
        },
      ],
      action: "Coverage question Q-019",
      recipient: "Property manager · human review",
      confirmation:
        "The sample manager acknowledged the question and requested the policy reference and incident details. The tenant receives that next step.",
      resolution:
        "The sample case remains with the manager for a policy-based decision. The conversation and missing-document request are retained; no coverage answer is invented.",
    },
  ],
  nexus: [
    {
      id: "consultation",
      title: "Consultation",
      source:
        "Fictional family-law intake guide. Gather practice area, jurisdiction, urgency and prior action, offer a sample slot, and require team confirmation. No legal advice or live calendar connection.",
      messages: [
        {
          from: "user",
          text: "I need to speak to someone about a family-law matter.",
        },
        {
          from: "agent",
          text: "I can help organise the next step. Are you reviewing a new family-law enquiry or asking about an existing case?",
          source: "Sample intake guide · consultation routing",
        },
        {
          from: "user",
          text: "A new family-law enquiry. Tomorrow afternoon would work.",
        },
        {
          from: "agent",
          text: "The sample calendar has a 14:00 consultation slot. I have prepared an intake summary and a slot request for the team to review. The intake summary includes England, separation and children, routine urgency and no prior filing. Do not share real case documents in this demo.",
        },
      ],
      action: "Consultation request C-014",
      recipient: "Client intake team · sample calendar",
      confirmation:
        "The sample intake team confirmed the 14:00 slot. The confirmation includes the appointment time and what to prepare.",
      resolution:
        "The consultation handoff is complete in the demo. The assigned team member receives the request and summary; any advice belongs to that professional.",
    },
    {
      id: "urgent",
      title: "Urgent intake",
      source:
        "Fictional escalation guide. A stated near-term deadline should be passed to a person with its context. Do not give legal instructions or promise availability.",
      messages: [
        {
          from: "user",
          text: "I received a notice and the deadline is tomorrow.",
        },
        {
          from: "agent",
          text: "That timing needs a person to review it promptly. I can record the deadline and the type of notice for the intake team. What kind of notice is it?",
          source: "Sample intake guide · urgent review",
        },
        {
          from: "user",
          text: "A family court notice. I want someone to call me.",
        },
        {
          from: "agent",
          text: "I have drafted an urgent callback request with the deadline and family-law enquiry category. A reviewer must accept the handoff; no legal conclusion is made here.",
        },
      ],
      action: "Urgent callback U-002",
      recipient: "Duty intake reviewer",
      confirmation:
        "The sample duty reviewer accepted the callback task. The request stays flagged with the stated deadline.",
      resolution:
        "The reviewer is assigned in the sample queue and has the conversation context. This demo records the handoff without claiming a real call took place.",
    },
    {
      id: "followup",
      title: "Follow-up",
      source:
        "Fictional appointment follow-up guide. Record the client’s preference and review any change to the appointment.",
      messages: [
        { from: "user", text: "Can I move my consultation to next week?" },
        {
          from: "agent",
          text: "I can prepare a change request. Which day and time would suit you?",
          source: "Sample follow-up guide",
        },
        { from: "user", text: "Tuesday morning." },
        {
          from: "agent",
          text: "I have drafted a request for Tuesday at 10:00 in the sample calendar. The team can check the change and issue an updated confirmation.",
        },
      ],
      action: "Appointment change A-010",
      recipient: "Scheduling team · sample calendar",
      confirmation:
        "The sample scheduler confirmed Tuesday at 10:00 and replaced the previous sample slot.",
      resolution:
        "The updated appointment and change history are visible in the demo. The original request remains in the record.",
    },
  ],
  bridgepoint: [
    {
      id: "missing",
      title: "Missing document",
      source:
        "Fictional onboarding checklist. Name, address and supporting address document are required for completeness review. This is not identity verification or a lending decision.",
      messages: [
        {
          from: "user",
          text: "Please check whether this sample application is complete.",
        },
        {
          from: "agent",
          text: "The fictional application includes a name and address, but its address document is missing. The next step is to ask for that item, then let a reviewer check completeness.",
          source: "Sample onboarding checklist · completeness",
        },
        {
          from: "user",
          text: "Prepare a message asking for the missing item.",
        },
        {
          from: "agent",
          text: "I drafted a request explaining which document is missing and how the team will review it. The message is ready for human approval. No real upload is connected.",
        },
      ],
      action: "Missing-information request D-017",
      recipient: "Applicant · sample onboarding queue",
      confirmation:
        "The sample applicant acknowledged the request. A placeholder address document is now marked available for reviewer inspection.",
      resolution:
        "The reviewer marked the fictional checklist complete. This advances intake only; it does not verify identity or approve credit.",
    },
    {
      id: "mismatch",
      title: "Field mismatch",
      source:
        "Fictional document review guide. Conflicting fields require confirmation rather than inferred corrections.",
      messages: [
        {
          from: "user",
          text: "The application says Cedar Road, but the supporting record says Cedar Lane.",
        },
        {
          from: "agent",
          text: "Those addresses conflict. I would flag the difference and ask the applicant to confirm the correct address, rather than silently changing it.",
          source: "Sample document guide · conflicting fields",
        },
        { from: "user", text: "Ask them to confirm it." },
        {
          from: "agent",
          text: "The draft states both sample values and asks for confirmation with the supporting record. A human reviewer can approve the clarification request.",
        },
      ],
      action: "Address clarification D-018",
      recipient: "Applicant · sample review queue",
      confirmation:
        "The fictional applicant confirmed Cedar Road and supplied a sample correction for the reviewer.",
      resolution:
        "The reviewer recorded the confirmed sample address and the reason for the change. The original mismatch remains in the action history.",
    },
    {
      id: "review",
      title: "Reviewer handoff",
      source:
        "Fictional review policy. Ambiguous or unreadable information goes to a human. Do not invent extracted fields.",
      messages: [
        {
          from: "user",
          text: "One page in this sample document is unreadable.",
        },
        {
          from: "agent",
          text: "I cannot establish the missing information. I can flag that page and prepare a request for a clearer copy.",
          source: "Sample document guide · unreadable page",
        },
        { from: "user", text: "Prepare that request for the reviewer." },
        {
          from: "agent",
          text: "The handoff identifies the unreadable page, leaves the missing field empty and asks for a replacement. It is ready for team review.",
        },
      ],
      action: "Document replacement D-019",
      recipient: "Document review team",
      confirmation:
        "The sample reviewer accepted the task and requested a replacement page.",
      resolution:
        "The demo leaves the field unresolved until a readable sample is supplied. The reviewer owns the next step; no missing value is inferred.",
    },
  ],
};
interface FlowState {
  step: number;
  phase: number;
  events: string[];
  extra: string[];
  reviewed: boolean;
}
const blank = (): FlowState => ({
  step: 0,
  phase: 0,
  events: [],
  extra: [],
  reviewed: false,
});
export default function AIWorkspace({ kind }: { kind: Kind }) {
  const list = scenarios[kind],
    name =
      kind === "meridian"
        ? "Meridian"
        : kind === "nexus"
          ? "Nexus"
          : "Bridgepoint",
    accent =
      kind === "meridian"
        ? "#2d5a3d"
        : kind === "nexus"
          ? "#1e3a5f"
          : "#0f5c5c";
  const [index, setIndex] = useState(0),
    [tab, setTab] = useState("chat"),
    [states, setStates] = useState<Record<string, FlowState>>({}),
    [question, setQuestion] = useState(""),
    [status, setStatus] = useState("");
  const s = list[index],
    flow = states[s.id] ?? blank();
  function change(value: Partial<FlowState>) {
    setStates((old) => ({
      ...old,
      [s.id]: { ...(old[s.id] ?? blank()), ...value },
    }));
  }
  function action(phase: number, text: string) {
    if (kind === "bridgepoint" && phase === 4 && !flow.reviewed) {
      setStatus(
        "Inspect the sample fields and confirm the reviewer check first.",
      );
      return;
    }
    change({ phase, events: [...flow.events, text] });
    setStatus(text);
  }
  function nextScenario(next: number) {
    setIndex((next + list.length) % list.length);
    setTab("chat");
    setStatus("");
    setQuestion("");
  }
  const phaseLabel = [
    "Draft",
    "Approved",
    "Demo dispatched",
    "Acknowledged",
    "Reviewed outcome",
  ][flow.phase];
  const later =
    flow.phase >= 2
      ? [
          {
            from: "agent" as const,
            text: "The approved action is now in the sample dispatch queue. You can follow its acknowledgement under Actions.",
          },
          ...(flow.phase >= 3
            ? [{ from: "agent" as const, text: s.confirmation }]
            : []),
          ...(flow.phase >= 4
            ? [{ from: "agent" as const, text: s.resolution }]
            : []),
        ]
      : [];
  const messages = [
    ...s.messages.slice(0, Math.min(s.messages.length, flow.step + 1)),
    ...later,
    ...flow.extra.map((text) => ({ from: "agent" as const, text })),
  ];
  const [touch, setTouch] = useState<{ x: number; y: number } | null>(null);
  return (
    <div
      onTouchStart={(e) =>
        setTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
      onTouchEnd={(e) => {
        if (!touch) return;
        const dx = e.changedTouches[0].clientX - touch.x,
          dy = e.changedTouches[0].clientY - touch.y;
        if (Math.abs(dx) > 75 && Math.abs(dy) < 40)
          nextScenario(index + (dx < 0 ? 1 : -1));
        setTouch(null);
      }}
    >
      <div className="demo-scenario-nav" aria-label={`${name} scenarios`}>
        {list.map((scenario, i) => (
          <button
            key={scenario.id}
            aria-pressed={index === i}
            onClick={() => nextScenario(i)}
          >
            {scenario.title}
          </button>
        ))}
      </div>
      <DemoShell
        name={name}
        subtitle={s.title + " · guided sample"}
        accent={accent}
        phone
        active={tab}
        tabs={[
          { id: "chat", label: "Chat" },
          { id: "actions", label: "Actions" },
          { id: "activity", label: "Activity" },
          { id: "sources", label: "Sources" },
        ]}
        onTab={setTab}
        onReset={() => {
          setStates({});
          setTab("chat");
          setQuestion("");
          setStatus("Sample conversations reset.");
        }}
        notice="scripted workflows"
      >
        <ol className="demo-steps" aria-label="Workflow progress">
          {["Intake", "Review", "Dispatch", "Acknowledged", "Outcome"].map(
            (label, i) => (
              <li
                key={label}
                aria-current={flow.phase === i ? "step" : undefined}
              >
                {label}
              </li>
            ),
          )}
        </ol>
        {status && (
          <p className="demo-notice" role="status">
            {status}
          </p>
        )}
        {tab === "chat" ? (
          <>
            <div className="demo-chat">
              {messages.map((message, i) => (
                <div key={i} className={`demo-message ${message.from}`}>
                  <small>
                    {message.from === "user"
                      ? "Sample enquiry"
                      : name + " · demo response"}
                  </small>
                  {message.text}
                  {"source" in message && message.source && (
                    <button
                      className="demo-source"
                      onClick={() => setTab("sources")}
                    >
                      {message.source} ↗
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="demo-actions">
              {flow.step < s.messages.length - 1 ? (
                <button
                  className="demo-primary"
                  onClick={() => change({ step: flow.step + 1 })}
                >
                  Continue conversation
                </button>
              ) : (
                <button
                  className="demo-primary"
                  onClick={() => setTab("actions")}
                >
                  Review proposed action
                </button>
              )}
            </div>
            <label className="demo-label">
              Try an additional question
              <input
                className="demo-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={180}
                placeholder="Ask outside this sample…"
              />
            </label>
            <button
              className="demo-secondary"
              onClick={() => {
                if (!question.trim()) {
                  setStatus("Enter a sample question first.");
                  return;
                }
                change({
                  extra: [
                    ...flow.extra,
                    `Your question: “${question.trim()}”. This guided demo has no supporting source for that question. I would attach it to the human-review queue rather than invent an answer.`,
                  ],
                  events: [
                    ...flow.events,
                    "Additional question routed to sample human review.",
                  ],
                });
                setQuestion("");
              }}
            >
              Ask / route to review
            </button>
          </>
        ) : tab === "actions" ? (
          <>
            <div className="demo-card">
              <Badge tone={flow.phase >= 3 ? "good" : "warn"}>
                {phaseLabel}
              </Badge>
              <h4 style={{ marginTop: 12 }}>{s.action}</h4>
              <p>
                <strong>Recipient</strong>
                <br />
                {s.recipient}
              </p>
              <p>
                <strong>Next step</strong>
                <br />
                {flow.phase < 3
                  ? "Review the draft, place it in the sample queue, then inspect the recipient acknowledgement."
                  : s.confirmation}
              </p>
              {kind === "nexus" && (
                <div className="demo-source">
                  <strong>
                    Intake summary ·{" "}
                    {s.id === "urgent"
                      ? "U-002"
                      : s.id === "followup"
                        ? "F-008"
                        : "C-014"}
                  </strong>
                  <p>
                    Practice: family law · sample jurisdiction: England & Wales
                    ·{" "}
                    {s.id === "urgent"
                      ? "Deadline: tomorrow · duty reviewer required"
                      : "Urgency: routine consultation"}{" "}
                    · prior action:{" "}
                    {s.id === "followup"
                      ? "Existing appointment change"
                      : "New enquiry; no advice issued"}
                    .
                  </p>
                  <p>
                    {flow.phase >= 3
                      ? "Assigned intake reviewer has the transcript and appointment / callback record."
                      : "Calendar / callback task remains a draft until team acceptance."}
                  </p>
                </div>
              )}
              {kind === "bridgepoint" && (
                <div className="demo-card">
                  <h4>Document comparison · sample application</h4>
                  <div className="demo-row">
                    <span className="demo-row-main">
                      <strong>Application address</strong>
                      <small>Cedar Road</small>
                    </span>
                  </div>
                  <div className="demo-row">
                    <span className="demo-row-main">
                      <strong>Supporting document</strong>
                      <small>
                        {s.id === "missing"
                          ? flow.phase >= 3
                            ? "Placeholder supplied · reviewer inspection required"
                            : "Missing address document"
                          : s.id === "mismatch"
                            ? "Cedar Lane · conflicts with application"
                            : "Unreadable page · field not extracted"}
                      </small>
                    </span>
                  </div>
                  <Badge tone="warn">
                    {s.id === "mismatch"
                      ? "Address mismatch"
                      : s.id === "missing"
                        ? "Completeness check"
                        : "Manual review required"}
                  </Badge>
                  {flow.phase >= 3 && (
                    <label className="demo-label">
                      <input
                        type="checkbox"
                        checked={flow.reviewed}
                        onChange={(e) => change({ reviewed: e.target.checked })}
                      />{" "}
                      Reviewer inspected the sample evidence{" "}
                      {s.id === "review"
                        ? "and retained the unresolved flag"
                        : "and recorded the clarification"}
                    </label>
                  )}
                  <p>
                    Intake review only. No identity verification, credit scoring
                    or eligibility decision.
                  </p>
                </div>
              )}
              <p className="demo-source">
                All dispatches and responses here are simulated. No contractor,
                tenant or external service is contacted.
              </p>
              <div className="demo-actions">
                {flow.step < s.messages.length - 1 ? (
                  <button
                    className="demo-secondary"
                    onClick={() => setTab("chat")}
                  >
                    Complete the intake first
                  </button>
                ) : flow.phase === 0 ? (
                  <button
                    className="demo-primary"
                    onClick={() =>
                      action(1, "Reviewer approved the draft sample action.")
                    }
                  >
                    Approve draft
                  </button>
                ) : flow.phase === 1 ? (
                  <button
                    className="demo-primary"
                    onClick={() =>
                      action(2, "Action placed in the sample dispatch queue.")
                    }
                  >
                    Simulate dispatch
                  </button>
                ) : flow.phase === 2 ? (
                  <button
                    className="demo-primary"
                    onClick={() =>
                      action(3, "Sample recipient acknowledgement recorded.")
                    }
                  >
                    Simulate acknowledgement
                  </button>
                ) : flow.phase === 3 ? (
                  <button
                    className="demo-primary"
                    onClick={() =>
                      action(
                        4,
                        "Sample follow-up outcome reviewed and recorded.",
                      )
                    }
                  >
                    Review follow-up outcome
                  </button>
                ) : (
                  <Badge tone="good">Follow-up recorded</Badge>
                )}
                <button
                  className="demo-secondary"
                  onClick={() => setTab("chat")}
                >
                  View conversation
                </button>
              </div>
            </div>
            {flow.phase >= 3 && (
              <div className="demo-card">
                <h4>Recipient response</h4>
                <p>{s.confirmation}</p>
              </div>
            )}
            {flow.phase === 4 && (
              <div className="demo-card">
                <h4>Outcome & next step</h4>
                <p>{s.resolution}</p>
              </div>
            )}
          </>
        ) : tab === "activity" ? (
          <div className="demo-card">
            <h4>Action history</h4>
            {flow.events.length ? (
              <ul className="demo-history">
                {flow.events.map((event, i) => (
                  <li key={i}>
                    <Badge>{String(i + 1).padStart(2, "0")}</Badge> {event}
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>
                Complete the intake and review an action to see its history.
              </Empty>
            )}
          </div>
        ) : (
          <div className="demo-card">
            <h4>Source & decision boundary</h4>
            <p>{s.source}</p>
            <p className="demo-source">
              Fictional example policy. These responses are scripted; no live
              model or document retrieval is connected.
            </p>
            <button className="demo-secondary" onClick={() => setTab("chat")}>
              Return to conversation
            </button>
          </div>
        )}
      </DemoShell>
      <div className="demo-conversation-footer">
        <button
          aria-label="Previous scenario"
          onClick={() => nextScenario(index - 1)}
        >
          ← Previous
        </button>
        <span>
          {index + 1} / {list.length}
        </span>
        <button
          aria-label="Next scenario"
          onClick={() => nextScenario(index + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
