"use client";

import { ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const linkedinUrl = `https://www.linkedin.com/in/alessandro-orlandi-584b29137/?locale=${locale === "de" ? "de_DE" : "en_US"}`;
  return (
    <footer id="footer" className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-foreground font-semibold text-sm">Alessandro Orlandi</p>
          <p className="text-muted text-xs mt-0.5">{t("role")}</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/impressum"
            className="text-muted hover:text-accent transition-colors text-xs font-mono"
          >
            {t("impressum")}
          </Link>
          <Link
            href="/datenschutz"
            className="text-muted hover:text-accent transition-colors text-xs font-mono"
          >
            {t("datenschutz")}
          </Link>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors text-xs font-mono flex items-center gap-1"
          >
            LinkedIn <ExternalLink size={12} />
          </a>
          <a
            href="https://github.com/fuggerstadt1907"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors text-xs font-mono flex items-center gap-1"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
