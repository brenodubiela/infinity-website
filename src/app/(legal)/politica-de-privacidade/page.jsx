import { Container } from "@/components/layout/container";
import { PageTransition } from "@/components/ui/page-transition";
import { PageHero } from "@/components/sections/page-hero";
import { companyData, privacyPolicy } from "@/data/legal-texts";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Como a Infinity Engenharia e Perícias coleta, usa, armazena e protege dados pessoais, nos termos da Lei Geral de Proteção de Dados (LGPD).",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <PageTransition>
      <PageHero
        breadcrumbs={[{ label: "Política de Privacidade", href: "/politica-de-privacidade" }]}
        eyebrow="LGPD · Lei nº 13.709/2018"
        title={privacyPolicy.title}
      />
      <Container className="py-10 lg:py-16">
        <article className="mx-auto max-w-[768px]">
          <p className="text-lg text-ink">{privacyPolicy.intro}</p>
          {privacyPolicy.sections.map((section) => (
            <section key={section.title} className="mt-6 border-t border-border pt-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-base text-muted">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-2 flex flex-col gap-1">
                  {section.items.map((item) => (
                    <li key={item.text} className="flex gap-1.5 text-base text-muted">
                      <span aria-hidden="true" className="mt-1.5 h-[2px] w-1.5 shrink-0 bg-primary" />
                      <span>
                        {item.term && <strong className="font-semibold text-ink">{item.term} </strong>}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {section.closing && <p className="mt-2 text-base text-muted">{section.closing}</p>}
            </section>
          ))}
          <dl className="mt-8 grid gap-1 border-t border-border pt-3 text-sm text-muted sm:grid-cols-[176px_1fr]">
            <dt className="font-mono text-label uppercase">Controlador</dt>
            <dd>
              {companyData.nomeFantasia} · CNPJ {companyData.cnpj}
              <br />
              {companyData.logradouro}, {companyData.bairro}, {companyData.cidade}/{companyData.uf}, CEP {companyData.cep}
              <br />
              <a href={`mailto:${companyData.emailContato}`} className="text-ink underline underline-offset-4">
                {companyData.emailContato}
              </a>
            </dd>
          </dl>
          <p className="mt-3 font-mono text-xs text-muted uppercase">Última atualização: {companyData.ultimaAtualizacao}</p>
        </article>
      </Container>
    </PageTransition>
  );
}
