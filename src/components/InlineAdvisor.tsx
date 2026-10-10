"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

/** The existing advisor endpoint, presented in document flow instead of over forms. */
export default function InlineAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim() || pending) return;
    const next: Message[] = [...messages, { role: "user", content: input.trim() }];
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-14), source: window.location.href }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string" || !data.reply.trim()) throw new Error("Unavailable");
      setMessages([...next, { role: "assistant", content: data.reply }]);
      setInput("");
    } catch {
      setError("The advisor could not reply. Your question is preserved. Try again or contact the team directly.");
    } finally { setPending(false); }
  }
  return <section aria-label="GITS AI Advisor" className="mt-6 max-w-2xl border border-white/30 p-5">
    <p className="text-sm text-white/80">Ask about a service or starting scope. Please do not include passwords or sensitive documents.</p>
    <div role="log" aria-live="polite" className="mt-4 max-h-80 overflow-y-auto space-y-4">
      {messages.map((message, i) => <p key={i} className="whitespace-pre-wrap break-words text-sm leading-6"><strong>{message.role === "user" ? "You" : "GITS Advisor"}: </strong>{message.content}</p>)}
    </div>
    <form onSubmit={submit} className="mt-5 space-y-3">
      <label className="block" htmlFor="inline-advisor-question">Your question</label>
      <textarea id="inline-advisor-question" value={input} onChange={e => setInput(e.target.value)} required maxLength={2000} rows={3} className="w-full border border-white/40 bg-black p-3 text-base focus-visible:outline-2 focus-visible:outline-white"/>
      <button disabled={pending} className="bg-white text-black px-5 py-3 disabled:opacity-60">{pending ? "Waiting for reply…" : "Ask advisor"}</button>
      {pending && <p role="status">Preparing a reply…</p>}
      {error && <p role="alert">{error}</p>}
    </form>
    <Link href="/contact#project-form" className="mt-4 inline-block underline py-3">Contact the team instead</Link>
  </section>;
}
