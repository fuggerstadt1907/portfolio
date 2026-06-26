"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const NAV_SECTIONS = [
  { id: "problems", labelKey: "problems" },
  { id: "about", labelKey: "about" },
  { id: "skills", labelKey: "skills" },
  { id: "contact", labelKey: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
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
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function switchLocale() {
    router.replace(pathname, { locale: t("language").toLowerCase() as "de" | "en" });
  }

  const scrollTo = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); router.push("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
              stroke="#00e5ff"
              strokeWidth="1.5"
              fill="rgba(0,229,255,0.06)"
            />
            <path
              d="M10 20 L14 9 L18 20 M11.8 16.5 H16.2"
              stroke="#00e5ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="3" cy="8" r="1" fill="#00e5ff" opacity="0.7" />
            <circle cx="25" cy="20" r="1" fill="#00e5ff" opacity="0.7" />
          </svg>
          Alessandro Orlandi
        </a>

        <div className="flex items-center gap-8">
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

          <button
            onClick={switchLocale}
            aria-label={`Sprache wechseln zu ${t("language")}`}
            className="font-mono text-xs text-accent border border-border px-3 py-1 rounded hover:bg-accent-muted transition-colors"
          >
            {t("language")}
          </button>
        </div>
      </div>
    </nav>
  );
}
