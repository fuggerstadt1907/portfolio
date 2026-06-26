import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("datenschutz.title") };
}

export default async function DatenschutzPage() {
  const t = await getTranslations("legal");

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link href="/#footer" className="text-muted hover:text-accent text-xs font-mono transition-colors mb-8 inline-block">
        ← {t("back")}
      </Link>
      <h1 className="text-2xl font-semibold text-foreground mb-8">{t("datenschutz.title")}</h1>

      <div className="space-y-6 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("datenschutz.verantwortlicher_heading")}</h2>
          <p>Alessandro Orlandi</p>
          <p>Pfalzstr. 16b, 86343 Königsbrunn</p>
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
          <h2 className="text-foreground font-semibold mb-2">{t("datenschutz.erhebung_heading")}</h2>
          <p>{t("datenschutz.erhebung_text")}</p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("datenschutz.kontaktformular_heading")}</h2>
          <p>{t("datenschutz.kontaktformular_text")}</p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("datenschutz.hosting_heading")}</h2>
          <p>{t("datenschutz.hosting_text")}</p>
        </section>

        <section>
          <h2 className="text-foreground font-semibold mb-2">{t("datenschutz.rechte_heading")}</h2>
          <p>{t("datenschutz.rechte_text")}</p>
        </section>
      </div>
    </main>
  );
}
