import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("impressum.title") };
}

export default async function ImpressumPage() {
  const t = await getTranslations("legal");

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/#footer" className="text-muted hover:text-accent text-xs font-mono transition-colors mb-8 inline-block">
        ← {t("back")}
      </Link>
      <h1 className="text-2xl font-semibold text-foreground mb-8">{t("impressum.title")}</h1>

      <div className="space-y-6 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("impressum.angaben_heading")}</h2>
          <p>Alessandro Orlandi</p>
          <p>Pfalzstr. 16b</p>
          <p>86343 Königsbrunn</p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("impressum.kontakt_heading")}</h2>
          <p>
            Tel:{" "}
            <a href="tel:+491728226515" className="hover:text-accent transition-colors">
              +49 (172) 8226515
            </a>
          </p>
          <p>
            E-Mail:{" "}
            <a href="mailto:aorlandi1990@gmail.com" className="hover:text-accent transition-colors">
              aorlandi1990@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("impressum.verantwortlich_heading")}</h2>
          <p>Alessandro Orlandi (Anschrift wie oben)</p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("impressum.haftung_heading")}</h2>
          <p>{t("impressum.haftung_text")}</p>
        </section>
      </div>
    </main>
  );
}
