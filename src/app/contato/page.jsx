import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/layout/container";
import { PageTransition } from "@/components/ui/page-transition";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { CoverageDetail } from "@/components/sections/coverage";
import { CtaBand } from "@/components/sections/cta-band";
import { contactFinalCta, contactHero, institutional, whatsappSection } from "@/data/contato";
import { companyData } from "@/data/legal-texts";
import { seo } from "@/data/site";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: seo.contato.title,
  description: seo.contato.description,
  path: "/contato",
  absolute: true,
});

export default function ContatoPage() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={[{ label: "Contato", href: "/contato" }]}
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        lead={contactHero.tagline}
        image={images.contatoHero}
      />

      <Section tone="light" id="formulario" className="scroll-mt-0">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
          <Reveal className="lg:col-span-7">
            <div className="rounded-md border border-border bg-canvas p-3 sm:p-4 lg:p-5">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-2 lg:col-span-5">
            <Reveal delay={0.1}>
              <div data-tone="dark" className="relative overflow-hidden rounded-md bg-surface-dark bg-grid-dark p-3 text-on-dark sm:p-4">
                <Eyebrow tone="dark">WhatsApp direto</Eyebrow>
                <WhatsAppButton label={whatsappSection.cta} variant="primary" className="mt-4 w-full" />
                <a
                  href={`mailto:${companyData.emailContato}`}
                  className="mt-2 flex items-center gap-1 font-mono text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                >
                  <Mail aria-hidden="true" strokeWidth={1.5} className="size-2" />
                  {companyData.emailContato}
                </a>
                <a
                  href={companyData.telefoneHref}
                  className="mt-1 flex items-center gap-1 font-mono text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                >
                  <Phone aria-hidden="true" strokeWidth={1.5} className="size-2" />
                  {companyData.telefone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="sr-only">Dados institucionais</h2>
              <dl className="divide-y divide-border rounded-md border border-border bg-surface-muted">
                {institutional.map((item) => (
                  <div key={item.label} className="grid gap-0.5 p-2 sm:grid-cols-[176px_1fr] sm:gap-2">
                    <dt className="font-mono text-label text-muted uppercase sm:pt-0.5">{item.label}</dt>
                    <dd className="text-base text-ink">
                      {item.href ? (
                        <a href={item.href} className="underline-offset-4 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      <CoverageDetail id="atuacao" tone="muted" index="02" />

      <CtaBand title={contactFinalCta.title} tagline={contactFinalCta.tagline} cta={contactFinalCta.cta} />
    </PageTransition>
  );
}
