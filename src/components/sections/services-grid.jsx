import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { serviceImages } from "@/data/images";
import { services } from "@/data/services";

export function ServiceCard({ service, index }) {
  const image = serviceImages[service.slug];

  return (
    <Card href={`/servicos/${service.slug}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-dark">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-surface-dark/10 transition-colors duration-300 group-hover/card:bg-transparent" />
        <span className="absolute top-1.5 left-1.5 flex size-5 items-center justify-center rounded-md bg-canvas text-ink transition-colors duration-300 group-hover/card:bg-primary group-hover/card:text-white">
          <ServiceIcon name={service.icon} label={service.iconAlt} className="size-2.5" />
        </span>
        <span className="absolute top-1.5 right-1.5 rounded-sm bg-surface-dark/80 px-1 py-0.5 font-mono text-label text-on-dark">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="mt-1 text-sm text-muted">{service.title}</p>
        <span className="mt-auto flex items-center justify-end pt-3 text-ink">
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-3 transition-transform duration-300 ease-out-expo group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-primary"
          />
        </span>
      </div>
    </Card>
  );
}

export function ServicesGrid({ index, eyebrow, title, lead, cta, exclude, tone = "muted" }) {
  const list = services.filter((service) => service.slug !== exclude);

  return (
    <Section tone={tone}>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <SectionHeading index={index} eyebrow={eyebrow} title={title} lead={lead} />
        {cta && (
          <Reveal delay={0.2} className="shrink-0">
            <Button href={cta.href}>{cta.label}</Button>
          </Reveal>
        )}
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        {list.map((service) => {
          const i = services.indexOf(service);
          return (
            <Reveal as="li" key={service.slug} delay={(i % 4) * 0.08}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
