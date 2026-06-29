"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Terminal } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { motion } from "framer-motion";

const LINKEDIN_URL = "https://www.linkedin.com/in/alessandro-orlandi-584b29137";

type Status = "idle" | "success" | "error";

export default function ContactTerminal() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setMessage("");
      }
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-accent text-xs tracking-widest uppercase mb-10"
        >
          Kontakt
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug"
        >
          {t("headline")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="flex items-center gap-6 mb-10"
        >
          <p className="text-muted text-base">{t("subheadline")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
          className="mb-10"
        >
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-border rounded text-sm text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <LinkedInIcon />
            {t("linkedin")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="rounded-xl overflow-hidden border border-border"
        >
          {/* Terminal header */}
          <div className="bg-surface-raised px-4 py-3 flex items-center gap-3 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs text-muted flex items-center gap-2">
              <Terminal size={12} />
              contact.sh
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-surface p-6 font-mono text-sm">
            <p className="text-accent mb-6">
              <span className="text-muted">$ </span>
              {t("terminal_intro")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-accent text-xs uppercase tracking-wider">
                  {t("label_name")}
                </label>
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <span className="text-muted">›</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("placeholder_name")}
                    className="flex-1 bg-transparent text-foreground placeholder-muted/40 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-accent text-xs uppercase tracking-wider">
                  {t("label_email")}
                </label>
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <span className="text-muted">›</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder_email")}
                    className="flex-1 bg-transparent text-foreground placeholder-muted/40 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-accent text-xs uppercase tracking-wider">
                  {t("label_message")}
                </label>
                <div className="flex gap-2 border-b border-border pb-2">
                  <span className="text-muted mt-0.5">›</span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("placeholder_message")}
                    className="flex-1 bg-transparent text-foreground placeholder-muted/40 outline-none font-mono resize-none"
                  />
                </div>
              </div>

              {status === "idle" && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded bg-accent text-background font-semibold cursor-pointer text-sm hover:opacity-90 transition-opacity disabled:opacity-50 glow-box-accent"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-pulse">▋</span> {t("loading")}
                    </span>
                  ) : (
                    `$ ${t("submit")}`
                  )}
                </button>
              )}

              {status === "success" && (
                <p className="font-mono text-green-400 text-sm">
                  <span className="text-muted">✓ </span>
                  {t("success")}
                </p>
              )}

              {status === "error" && (
                <p className="font-mono text-red-400 text-sm">
                  <span className="text-muted">✗ </span>
                  {t("error")}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
