import { Building2, Navigation } from "lucide-react";
import { Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrazilMap } from "@/components/illustrations/brazil-map";
import { coverage } from "@/data/contato";
import { coverageTeaser } from "@/data/home";

export function CoverageTeaser({ index = "07" }) {
  return (
    <Section tone="light">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-5">
          <SectionHeading
            index={index}
            eyebrow={coverageTeaser.eyebrow}
            title={coverageTeaser.title}
            lead={coverageTeaser.tagline}
          />
          <Reveal delay={0.24} className="mt-5">
            <Button href={coverageTeaser.cta.href}>
              {coverageTeaser.cta.label}
            </Button>
          </Reveal>
        </div>
        <InView className="mx-auto w-full max-w-[560px] data-[inview=false]:[--play:paused] lg:col-span-6 lg:col-start-7">
          <BrazilMap tone="light" />
        </InView>
      </div>
    </Section>
  );
}

export function CoverageDetail({ id, index, tone = "light", headingAs = "h2", showHeading = true }) {
  const dark = tone === "dark";
  const cards = [
    { icon: Building2, ...coverage.hq },
    { icon: Navigation, ...coverage.support },
  ];

  return (
    <Section tone={tone} id={id}>
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-6">
          {showHeading && (
            <SectionHeading
              index={index}
              eyebrow={coverage.eyebrow}
              title={coverage.title}
              lead={coverage.tagline}
              tone={tone}
              as={headingAs}
            />
          )}
          <ul className={showHeading ? "mt-6 grid gap-2" : "grid gap-2"}>
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal as="li" key={card.title} delay={0.1 + i * 0.1}>
                  <div
                    className={
                      dark
                        ? "flex gap-2 rounded-md border border-border-dark p-3"
                        : "flex gap-2 rounded-md border border-border bg-canvas p-3"
                    }
                  >
                    <span
                      className={
                        dark
                          ? "flex size-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-on-dark"
                          : "flex size-6 shrink-0 items-center justify-center rounded-md bg-surface-muted text-ink"
                      }
                    >
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-3" />
                    </span>
                    <div>
                      <h3 className={dark ? "text-lg font-semibold text-on-dark" : "text-lg font-semibold"}>
                        {card.title}
                      </h3>
                      <p className={dark ? "mt-1 text-sm text-on-dark-muted" : "mt-1 text-sm text-muted"}>{card.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <Reveal delay={0.3} className="mt-5">
            <Button href={coverage.cta.href}>
              {coverage.cta.label}
            </Button>
          </Reveal>
        </div>
        <InView className="mx-auto w-full max-w-[600px] data-[inview=false]:[--play:paused] lg:col-span-6">
          <BrazilMap tone={tone === "dark" ? "dark" : "light"} />
        </InView>
      </div>
    </Section>
  );
}
