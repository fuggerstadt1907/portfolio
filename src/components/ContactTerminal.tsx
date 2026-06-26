"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6"
        >
          {t("headline")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          className="text-center mb-12 space-y-4"
        >
          {t("subheadline").split("\n\n").map((para, i) => (
            <p key={i} className="text-muted text-lg max-w-2xl mx-auto">
              {para}
            </p>
          ))}
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
