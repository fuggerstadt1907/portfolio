"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const NAV_SECTIONS = [
  { id: "journey", labelKey: "journey" },
  { id: "problems", labelKey: "problems" },
  { id: "about", labelKey: "about" },
  { id: "contact", labelKey: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const terminalRef = useRef<HTMLSpanElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function switchLocale() {
    router.replace(pathname, {
      locale: t("language").toLowerCase() as "de" | "en",
    });
  }

  const scrollTo = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const Logo = () => (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        setMobileOpen(false);
        router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex items-center gap-2.5 font-mono text-accent font-semibold tracking-tight"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="14,2 25,8 25,20 14,26 3,20 3,8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.06"
        />
        <path
          d="M10 20 L14 9 L18 20 M11.8 16.5 H16.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="3" cy="8" r="1" fill="currentColor" opacity="0.7" />
        <circle cx="25" cy="20" r="1" fill="currentColor" opacity="0.7" />
      </svg>
      Alessandro Orlandi
    </a>
  );

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen ? "navbar-glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.map(({ id, labelKey }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={scrollTo(id)}
                  className={`relative text-sm transition-colors ${
                    mounted && isActive
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t(labelKey)}
                  {mounted && isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent rounded-full" />
                  )}
                </a>
              );
            })}
            <div className="flex items-center gap-3">
              <button
                onClick={switchLocale}
                aria-label={t("aria_language")}
                className="w-8 h-8 flex items-center justify-center font-mono text-xs text-accent border border-border rounded hover:bg-accent-muted transition-colors cursor-pointer"
              >
                {t("language")}
              </button>
              {mounted && (
                <button
                  onClick={toggle}
                  aria-label={
                    theme === "dark"
                      ? t("aria_theme_dark")
                      : t("aria_theme_light")
                  }
                  className="w-8 h-8 flex items-center justify-center rounded border border-border text-accent hover:bg-accent-muted transition-colors cursor-pointer"
                >
                  {theme === "dark" ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile terminal toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t("aria_menu_close") : t("aria_menu_open")}
            aria-expanded={mobileOpen}
            className="md:hidden group relative font-mono text-accent flex items-center gap-1 px-3 py-1.5 rounded border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,229,255,0.35)]"
          >
            <motion.span
              animate={{
                opacity: mobileOpen ? 0 : 1,
                width: mobileOpen ? 0 : "auto",
              }}
              transition={{ duration: 0.15 }}
              className="text-xs overflow-hidden whitespace-nowrap"
            >
              &gt;_
            </motion.span>
            <motion.span
              animate={{
                rotate: mobileOpen ? 45 : 0,
                opacity: mobileOpen ? 1 : 0,
                width: mobileOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
              className="text-lg leading-none overflow-hidden"
            >
              ×
            </motion.span>
            <span
              ref={terminalRef}
              className="w-0.5 h-4 bg-accent inline-block"
              style={{ animation: "terminal-blink 1s step-end infinite" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — portaled into body to escape body > *:not(nav) CSS rule */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                data-mobile-overlay=""
                className="fixed inset-0 z-40 md:hidden flex flex-col"
                style={{
                  background:
                    theme === "dark"
                      ? "rgba(8,12,16,0.97)"
                      : "rgba(240,244,248,0.97)",
                }}
              >
                {/* Scan-line overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.025) 3px, rgba(0,229,255,0.025) 4px)",
                    backgroundSize: "100% 4px",
                  }}
                />

                {/* Neon corner brackets */}
                <div
                  aria-hidden="true"
                  className="absolute top-20 left-5 w-6 h-6 border-t border-l border-accent/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-20 right-5 w-6 h-6 border-t border-r border-accent/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-10 left-5 w-6 h-6 border-b border-l border-accent/40"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-10 right-5 w-6 h-6 border-b border-r border-accent/40"
                />

                {/* Nav items */}
                <div className="flex-1 flex flex-col justify-center px-10 gap-2 mt-16">
                  <p className="font-mono text-xs text-accent/50 mb-6 tracking-widest">
                    // NAVIGATION
                  </p>
                  {NAV_SECTIONS.map(({ id, labelKey }, i) => {
                    const isActive = activeSection === id;
                    return (
                      <motion.a
                        key={id}
                        href={`#${id}`}
                        onClick={scrollTo(id)}
                        initial={{ x: -24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -16, opacity: 0 }}
                        transition={{
                          delay: i * 0.07 + 0.1,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className={`group flex items-center gap-4 py-4 border-b font-mono text-lg font-medium tracking-wide transition-all duration-300 ${
                          isActive
                            ? "text-accent border-accent/30"
                            : "text-muted border-border hover:text-accent hover:border-accent/20"
                        }`}
                        style={
                          isActive
                            ? { textShadow: "0 0 18px rgba(0,229,255,0.7)" }
                            : undefined
                        }
                      >
                        <span className="text-accent/40 text-xs font-mono w-5 text-right select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{t(labelKey)}</span>
                        <span
                          className="text-accent/0 group-hover:text-accent/70 transition-all duration-300 text-sm"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </motion.a>
                    );
                  })}

                  {/* Language + Theme switch */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="mt-8 flex items-center gap-3"
                  >
                    <button
                      onClick={() => {
                        switchLocale();
                        setMobileOpen(false);
                      }}
                      className="w-9 h-9 flex items-center justify-center font-mono text-xs text-accent border border-accent/30 rounded hover:bg-accent-muted hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all"
                    >
                      {t("language")}
                    </button>
                    <button
                      onClick={toggle}
                      aria-label={
                        theme === "dark"
                          ? t("aria_theme_dark")
                          : t("aria_theme_light")
                      }
                      className="w-9 h-9 flex items-center justify-center rounded border border-accent/30 text-accent hover:bg-accent-muted transition-all"
                    >
                      {theme === "dark" ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                    </button>
                  </motion.div>
                </div>

                {/* Bottom status bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-10 pb-8 font-mono text-xs text-accent/25 flex justify-between"
                >
                  <span>SYS:ONLINE</span>
                  <span>z-landing v1.0</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
