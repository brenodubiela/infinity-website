import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo, Symbol } from "@/components/ui/logo";
import { CookiePreferencesButton } from "@/components/ui/cookie-banner";
import { companyData } from "@/data/legal-texts";
import { footer } from "@/data/site";
import { services } from "@/data/services";

function FooterHeading({ children }) {
  return <h2 className="font-mono text-label text-on-dark-muted uppercase">{children}</h2>;
}

const linkClass = "text-sm text-silver transition-colors duration-200 hover:text-on-dark";

export function Footer() {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-surface-deep text-on-dark">
      <Symbol
        tone="light"
        className="pointer-events-none absolute -right-8 -bottom-8 w-[640px] opacity-[0.04] max-md:hidden"
      />
      <Container className="relative py-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block rounded-sm" aria-label="Infinity Engenharia e Perícias, página inicial">
              <Logo variant="horizontal" tone="light" className="w-[280px]" label="" />
            </Link>
            <address className="mt-4 flex flex-col gap-1 text-sm text-silver not-italic">
              <span className="font-medium text-on-dark">{footer.razaoSocial}</span>
              {companyData.cnpj && <span>CNPJ: {companyData.cnpj}</span>}
              <span>Endereço: {footer.endereco}</span>
              <span>
                E-mail:{" "}
                <a href={`mailto:${footer.email}`} className="text-on-dark underline-offset-4 hover:underline">
                  {footer.email}
                </a>
              </span>
              {companyData.telefone && (
                <span>
                  {companyData.whatsapp ? "Telefone / WhatsApp:" : "Telefone:"}{" "}
                  <a href={companyData.telefoneHref} className="text-on-dark underline-offset-4 hover:underline">
                    {companyData.telefone}
                  </a>
                </span>
              )}
            </address>
          </div>

          <nav aria-labelledby="rodape-navegacao" className="lg:col-span-2">
            <FooterHeading>
              <span id="rodape-navegacao">Navegação</span>
            </FooterHeading>
            <ul className="mt-2 flex flex-col gap-1">
              {footer.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-servicos" className="lg:col-span-4">
            <FooterHeading>
              <span id="rodape-servicos">Serviços</span>
            </FooterHeading>
            <ul className="mt-2 flex flex-col gap-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/servicos/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <FooterHeading>Redes Sociais</FooterHeading>
            <ul className="mt-2 flex flex-col gap-1">
              {footer.social.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-silver">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border-dark pt-3 text-sm text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/politica-de-privacidade" className="transition-colors hover:text-on-dark">
              Política de Privacidade
            </Link>
            <CookiePreferencesButton className="transition-colors hover:text-on-dark" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
