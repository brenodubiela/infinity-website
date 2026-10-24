import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { BulletList } from "@/components/ui/bullet-list";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { FigureFrame } from "@/components/ui/figure-frame";
import { FireOriginPlan } from "@/components/illustrations/fire-origin-plan";
import { MachineDiagnostics } from "@/components/illustrations/machine-diagnostics";
import { ReconstructionScene } from "@/components/illustrations/reconstruction-scene";
import { TechnicalDrawing } from "@/components/illustrations/technical-drawing";
import { VehicleInspection } from "@/components/illustrations/vehicle-inspection";
import { audienceLabel, services } from "@/data/services";
import { serviceImages } from "@/data/images";
import { technologyTeaser } from "@/data/home";
import { cn } from "@/utils/cn";

const ctaHref = "/contato#formulario";

const serviceIllustrations = {
  "reconstrucao-acidentes-transito": () => <ReconstructionScene tone="light" />,
  "pericia-investigacao-incendios": () => <FireOriginPlan tone="light" />,
  "pericias-automotivas-cautelares": () => <VehicleInspection tone="light" />,
  "pericias-industriais": () => <MachineDiagnostics tone="light" />,
  "projetos-analises-engenharia-mecanica": () => <TechnicalDrawing tone="light" />,
  "assistencia-tecnica-judicial": () => <TechnicalDrawing tone="light" />,
  "avaliacao-maquinas-equipamentos": () => <MachineDiagnostics tone="light" />,
  "treinamentos-tecnicos": () => <TechnicalDrawing tone="light" />,
};

export function AudienceBox({ text, className }) {
  return (
    <div className={cn("relative rounded-md border border-border bg-highlight py-2 pr-3 pl-4", className)}>
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-0.5 rounded-l-md bg-primary" />
      <p className="font-mono text-label text-primary uppercase">{audienceLabel}</p>
      <p className="mt-1 text-base text-ink">{text}</p>
    </div>
  );
}

export function ServicesOverview() {
  return (
    <Section tone="light">
      <ol className="border-t border-border">
        {services.map((service, i) => (
          <li key={service.slug} id={service.slug} className="scroll-mt-12 border-b border-border">
            <article className="grid gap-4 py-6 lg:grid-cols-12 lg:gap-4 lg:py-8">
              <Reveal className="lg:col-span-5">
                <Link
                  href={`/servicos/${service.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="group/photo relative block aspect-[16/10] overflow-hidden rounded-md bg-surface-dark"
                >
                  <Image
                    src={serviceImages[service.slug].src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover/photo:scale-105"
                  />
                  <span className="absolute top-1.5 left-1.5 flex size-5 items-center justify-center rounded-md bg-canvas text-ink">
                    <ServiceIcon name={service.icon} className="size-2.5" />
                  </span>
                </Link>
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="text-2xl font-semibold">{service.name}</h2>
                </div>
                <Eyebrow className="mt-2">{service.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
                <p className="text-xl font-semibold text-ink">{service.title}</p>
                <p className="mt-2 text-base text-muted">{service.tagline}</p>
                <AudienceBox text={service.audience} className="mt-3" />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button href={ctaHref} variant="primary" size="sm">
                    {service.cta}
                  </Button>
                  <ArrowLink href={`/servicos/${service.slug}`} aria-label={`${technologyTeaser.linkLabel}: ${service.name}`}>
                    {technologyTeaser.linkLabel}
                  </ArrowLink>
                </div>
              </Reveal>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function ServiceBody({ service, index }) {
  return (
    <Section tone="light">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <Reveal>
              <Eyebrow index={index}>{service.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-2 text-2xl font-semibold lg:text-3xl">{service.title}</h2>
            </Reveal>
            <Reveal delay={0.16} className="mt-5">
              <Button href={ctaHref}>{service.cta}</Button>
            </Reveal>
            <Reveal delay={0.24} className="mt-6">
              <FigureFrame>
                {serviceIllustrations[service.slug]()}
              </FigureFrame>
            </Reveal>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
          {service.items.length > 0 ? (
            <BulletList items={service.items} numbered />
          ) : (
            <Reveal>
              <p className="text-lg text-muted">{service.tagline}</p>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <AudienceBox text={service.audience} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
