"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "video"; url: string; caption?: string };

const CATEGORIES = [
  "Product News",
  "Engineering Insights",
  "UI/UX Strategy",
  "AI Insights",
  "Security",
  "Design Trends",
  "DevOps",
  "Update",
  "Video",
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  // Post form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [readTime, setReadTime] = useState("5 min read");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [highlights, setHighlights] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([{ type: "p", text: "" }]);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Derive slug from title automatically
  function handleTitleChange(v: string) {
    setTitle(v);
    setSlug(
      v
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-")
    );
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: fd,
    });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setCoverImage(data.url);
      setCoverPreview(data.url);
    } else {
      alert("Upload failed: " + (data.error || "Unknown error"));
    }
  }

  function addBlock(type: ContentBlock["type"]) {
    if (type === "ul") {
      setBlocks((b) => [...b, { type: "ul", items: [""] }]);
    } else if (type === "video") {
      setBlocks((b) => [...b, { type: "video", url: "", caption: "" }]);
    } else {
      setBlocks((b) => [...b, { type, text: "" } as ContentBlock]);
    }
  }

  function updateBlock(idx: number, patch: Partial<ContentBlock>) {
    setBlocks((b) =>
      b.map((block, i) => (i === idx ? ({ ...block, ...patch } as ContentBlock) : block))
    );
  }

  function removeBlock(idx: number) {
    setBlocks((b) => b.filter((_, i) => i !== idx));
  }

  function moveBlock(idx: number, dir: -1 | 1) {
    setBlocks((b) => {
      const arr = [...b];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
  }

  async function handleSubmit() {
    if (!title || !slug || !coverImage || !summary) {
      setStatus("error");
      setStatusMsg("Title, slug, cover image, and summary are required.");
      return;
    }
    setStatus("saving");
    const post = {
      slug,
      title,
      date,
      readTime,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      coverImage,
      summary,
      excerpt: excerpt || summary,
      highlights: highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      content: blocks.filter((b) => {
        if ("text" in b) return b.text.trim();
        if (b.type === "ul") return b.items.some((i) => i.trim());
        if (b.type === "video") return b.url.trim();
        return false;
      }),
      videoUrl: videoUrl || undefined,
      postType: videoUrl ? "video" : "article",
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      setStatus("success");
      setStatusMsg(`"${title}" published successfully! View at /blog/${slug}`);
    } else {
      setStatus("error");
      setStatusMsg("Failed to save. Check your admin password and try again.");
    }
  }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-medium text-gray-900">GITS Admin</h1>
            <p className="mt-1 text-sm text-gray-500">Blog management</p>
            <div className="mt-6 space-y-4">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetch("/api/posts", { headers: { "x-admin-password": password } })
                      .then((r) => {
                        if (r.ok) setAuthed(true);
                        else setAuthError("Wrong password.");
                      })
                      .catch(() => setAuthError("Server error."));
                  }
                }}
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {authError && <p className="text-xs text-red-500">{authError}</p>}
              <button
                onClick={() => {
                  fetch("/api/posts", { headers: { "x-admin-password": password } })
                    .then((r) => {
                      if (r.ok) setAuthed(true);
                      else setAuthError("Wrong password.");
                    })
                    .catch(() => setAuthError("Server error."));
                }}
                className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:opacity-90 transition"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ADMIN PANEL
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">New Post</h1>
            <p className="text-sm text-gray-500 mt-1">
              <a href="/blog" className="underline">← Back to blog</a>
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={status === "saving"}
            className="rounded-xl bg-black px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {status === "saving" ? "Publishing…" : "Publish Post"}
          </button>
        </div>

        {status === "success" && (
          <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
            ✓ {statusMsg}
          </div>
        )}
        {status === "error" && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
            {statusMsg}
          </div>
        )}

        {/* META */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-4 space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">Post Details</h2>

          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Title *</span>
              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your post title"
                className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Slug (auto-generated)</span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-url-slug"
                className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm font-mono outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Read Time</span>
                <input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Tags (comma-separated)</span>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="AI, Design, Next.js"
                  className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* COVER IMAGE */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Cover Image *</h2>

          {coverPreview ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-3">
              <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => { setCoverImage(""); setCoverPreview(""); }}
                className="absolute top-2 right-2 rounded-lg bg-black/60 px-3 py-1 text-xs text-white"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-gray-50 p-10 cursor-pointer hover:border-blue-400 transition"
            >
              <div className="text-center">
                <p className="text-sm text-gray-600">{uploading ? "Uploading…" : "Click to upload cover image"}</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — recommended 1280×800</p>
              </div>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImageUpload(f);
            }}
          />

          <div className="mt-3">
            <span className="text-xs text-gray-500">Or paste an image URL:</span>
            <input
              value={coverImage.startsWith("/blog/uploads") ? "" : coverImage}
              onChange={(e) => { setCoverImage(e.target.value); setCoverPreview(e.target.value); }}
              placeholder="https://..."
              className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* SUMMARY & EXCERPT */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-4 space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">Summary & Excerpt</h2>

          <label className="block">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Summary * (shown in listings)</span>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={2}
              placeholder="One or two sentences describing the post."
              className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Excerpt (shown at top of post, falls back to summary)</span>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Slightly longer intro paragraph shown at the top of the post."
              className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </label>

          <label className="block">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Key Highlights (one per line, shown as bullet cards)</span>
            <textarea
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              rows={4}
              placeholder={"First highlight point\nSecond highlight point\nThird highlight point"}
              className="mt-1 w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </label>
        </div>

        {/* VIDEO (optional) */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3">Video (optional)</h2>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="YouTube or Vimeo URL — makes this a video post"
            className="w-full rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-400 mt-2">
            YouTube: https://youtube.com/watch?v=... or https://youtu.be/... · Vimeo: https://vimeo.com/...
          </p>
        </div>

        {/* CONTENT BLOCKS */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Article Content</h2>

          <div className="space-y-3">
            {blocks.map((block, idx) => (
              <div key={idx} className="group relative rounded-xl border border-black/10 bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                    {block.type === "p" ? "Paragraph" :
                     block.type === "h2" ? "Heading 2" :
                     block.type === "h3" ? "Heading 3" :
                     block.type === "quote" ? "Quote" :
                     block.type === "ul" ? "List" :
                     "Video Embed"}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    <button onClick={() => moveBlock(idx, -1)} className="text-xs text-gray-400 hover:text-gray-700 px-1">↑</button>
                    <button onClick={() => moveBlock(idx, 1)} className="text-xs text-gray-400 hover:text-gray-700 px-1">↓</button>
                    <button onClick={() => removeBlock(idx)} className="text-xs text-red-400 hover:text-red-600 px-1">✕</button>
                  </div>
                </div>

                {block.type === "ul" ? (
                  <div className="space-y-2">
                    {block.items.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => {
                            const items = [...block.items];
                            items[i] = e.target.value;
                            updateBlock(idx, { items } as any);
                          }}
                          placeholder={`List item ${i + 1}`}
                          className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => {
                            const items = block.items.filter((_, j) => j !== i);
                            updateBlock(idx, { items } as any);
                          }}
                          className="text-xs text-red-400 hover:text-red-600"
                        >✕</button>
                      </div>
                    ))}
                    <button
                      onClick={() => updateBlock(idx, { items: [...block.items, ""] } as any)}
                      className="text-xs text-blue-600 hover:underline"
                    >+ Add item</button>
                  </div>
                ) : block.type === "video" ? (
                  <div className="space-y-2">
                    <input
                      value={block.url}
                      onChange={(e) => updateBlock(idx, { url: e.target.value } as any)}
                      placeholder="YouTube / Vimeo / direct video URL"
                      className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                    <input
                      value={"caption" in block ? block.caption || "" : ""}
                      onChange={(e) => updateBlock(idx, { caption: e.target.value } as any)}
                      placeholder="Caption (optional)"
                      className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                ) : (
                  <textarea
                    value={"text" in block ? block.text : ""}
                    onChange={(e) => updateBlock(idx, { text: e.target.value } as any)}
                    rows={block.type === "p" ? 3 : 1}
                    placeholder={
                      block.type === "h2" ? "Section heading" :
                      block.type === "h3" ? "Sub-heading" :
                      block.type === "quote" ? "Quote text" :
                      "Paragraph text…"
                    }
                    className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "+ Paragraph", type: "p" as const },
              { label: "+ Heading 2", type: "h2" as const },
              { label: "+ Heading 3", type: "h3" as const },
              { label: "+ Quote", type: "quote" as const },
              { label: "+ List", type: "ul" as const },
              { label: "+ Video", type: "video" as const },
            ].map(({ label, type }) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="rounded-lg border border-black/15 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* PUBLISH */}
        <div className="flex justify-end pb-16">
          <button
            onClick={handleSubmit}
            disabled={status === "saving"}
            className="rounded-xl bg-black px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {status === "saving" ? "Publishing…" : "Publish Post"}
          </button>
        </div>
      </div>
    </main>
  );
}