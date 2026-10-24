import { Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InView } from "@/components/ui/in-view";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrainCircuit, Check, ClipboardCheck, Database, Gauge, Route, ShieldCheck, Workflow } from "lucide-react";
import { Timeline } from "@/components/sections/timeline";
import { MiniAi, MiniChecklist, MiniErp, MiniLean } from "@/components/illustrations/process-minis";
import { SymbolConstruction } from "@/components/illustrations/symbol-construction";
import { innovation, international, origin, specialist } from "@/data/sobre";
import { altTexts } from "@/data/site";
import { cn } from "@/utils/cn";

function highlightTerms(text, terms) {
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    terms.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function OriginBody({ index = "01" }) {
  return (
    <Section tone="light" id="origem">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <Reveal className="lg:col-span-6">
          <InView className="data-[inview=false]:[--play:paused]">
            <SymbolConstruction tone="light" />
          </InView>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index={index}>A EMPRESA</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-2 text-2xl font-semibold lg:text-3xl">{origin.tagline}</h2>
          </Reveal>
          <div className="mt-4 flex flex-col gap-3">
            {origin.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.16 + i * 0.08}>
                <p className={i === 0 ? "text-lg text-ink" : "text-base text-muted md:text-lg"}>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Specialist({ index = "02" }) {
  return (
    <Section tone="muted" id="especialista">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-14">
            <PhotoPlaceholder label={altTexts.emerson} />
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading index={index} eyebrow={specialist.eyebrow} title={specialist.title} size="sm" />
          <div className="mt-4 flex flex-col gap-3">
            {specialist.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-base text-muted md:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-5">
            <Button href={specialist.cta.href}>
              {specialist.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function International({ index = "03" }) {
  return (
    <section id="presenca-internacional" data-tone="dark" className="relative bg-surface-dark text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark" />
      <div className="relative">
        <Timeline
          events={international.events}
          label={international.intro}
          heading={
            <>
              <SectionHeading index={index} eyebrow={international.eyebrow} title={international.title} tone="dark" />
              <p className="mt-3 font-mono text-sm text-on-dark-muted">{international.intro}</p>
            </>
          }
        />
      </div>
    </section>
  );
}

const innovationSteps = [
  { title: "ERP próprio", icon: Database, Visual: MiniErp },
  { title: "Lean Manufacturing", icon: Workflow, Visual: MiniLean },
  { title: "Procedimentos padronizados", icon: ClipboardCheck, Visual: MiniChecklist },
  { title: "Inteligência artificial", icon: BrainCircuit, Visual: MiniAi },
];

const outcomeIcons = [Gauge, Route, ShieldCheck];

export function Innovation({ index = "04" }) {
  const statements = innovation.tagline.split(/(?<=\.)\s+/);
  const outcomes = ["eficiente", "rastreável", "consistente"];

  return (
    <Section tone="light" id="tecnologia-interna" className="overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-4">
        <SectionHeading index={index} eyebrow={innovation.eyebrow} title={innovation.title} className="lg:col-span-6" />
        <ul className="grid gap-1 lg:col-span-5 lg:col-start-8">
          {statements.map((statement, i) => (
            <Reveal as="li" key={statement} delay={0.1 + i * 0.1}>
              <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-2 py-1.5">
                <span className="flex size-3 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check aria-hidden="true" strokeWidth={2.5} className="size-2" />
                </span>
                <span className="text-base font-semibold text-ink">{statement}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <InView className="relative mt-8 data-[inview=false]:[--play:paused] lg:mt-12">
        <div aria-hidden="true" className="absolute top-[11px] right-[12.5%] left-[12.5%] hidden h-[2px] bg-border xl:block">
          <span
            className={cn(
              "absolute inset-y-0 left-0 w-full origin-left bg-signature-line animate-[grow-x_1.6s_var(--ease-out-expo)_both]",
              "[animation-play-state:var(--play,running)]",
            )}
          />
          <span className="absolute -top-[3px] size-[8px] -translate-x-1/2 rounded-full bg-primary animate-[travel-left_4.8s_cubic-bezier(0.65,0,0.35,1)_infinite] [animation-play-state:var(--play,running)] motion-reduce:hidden" />
        </div>
        <ol className="relative grid gap-2 md:grid-cols-2 xl:grid-cols-4 xl:pt-5">
          {innovationSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="group/step relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-[36px] left-1/2 hidden size-[14px] -translate-x-1/2 rounded-full border-2 border-ink bg-canvas transition-colors duration-300 group-hover/step:border-primary group-hover/step:bg-primary xl:block"
                />
                <article className="flex h-full flex-col rounded-md border border-border bg-canvas p-3 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-ink/40">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 flex size-6 items-center justify-center rounded-md bg-ink text-white transition-colors duration-300 group-hover/step:bg-primary">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-3" />
                    </span>
                    <span className="font-mono text-label text-primary">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <div className="mt-2 rounded-sm bg-surface-muted px-2 py-1.5">
                    <step.Visual />
                  </div>
                  <p className="mt-3 text-sm text-muted">{highlightTerms(innovation.paragraphs[i], innovation.keyTerms)}</p>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </InView>

      <Reveal className="mt-6 lg:mt-8">
        <div className="relative grid items-center gap-3 overflow-hidden rounded-md bg-surface-dark p-3 text-on-dark lg:grid-cols-12 lg:gap-4 lg:p-5">
          <div aria-hidden="true" className="absolute inset-0 bg-grid-dark" />
          <p className="relative text-lg text-on-dark lg:col-span-7 lg:text-xl">{innovation.conclusion}</p>
          <ul aria-hidden="true" className="relative flex flex-wrap gap-1 lg:col-span-5 lg:justify-end">
            {outcomes.map((outcome, i) => {
              const Icon = outcomeIcons[i];
              return (
                <li
                  key={outcome}
                  className="flex h-5 items-center gap-1 rounded-sm border border-border-dark px-1.5 font-mono text-xs text-silver uppercase"
                >
                  <Icon strokeWidth={1.5} className="size-2 text-primary-on-dark" />
                  {outcome}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
