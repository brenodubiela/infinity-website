import { FileCheck2, Search, Waypoints } from "lucide-react";
import { Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { InView } from "@/components/ui/in-view";
import { FigureFrame } from "@/components/ui/figure-frame";
import { MachineDiagnostics } from "@/components/illustrations/machine-diagnostics";
import { forensic } from "@/data/home";

const icons = [Search, Waypoints, FileCheck2];

function emphasizeTools(text) {
  const parts = text.split(/(CDR Bosch®|CrashScan®|Virtual CRASH®|eCrash®)/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function Forensic({ index = "01" }) {
  return (
    <Section tone="light">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <SectionHeading
          index={index}
          eyebrow={forensic.eyebrow}
          title={forensic.title}
          lead={forensic.tagline}
          className="lg:col-span-6"
        />
        <Reveal delay={0.2} className="lg:col-span-6">
          <FigureFrame>
            <MachineDiagnostics />
          </FigureFrame>
        </Reveal>
      </div>

      <InView className="relative mt-8 data-[inview=false]:[--play:paused] lg:mt-12">
        <svg aria-hidden="true" className="absolute top-3 left-0 hidden h-[2px] w-full lg:block" preserveAspectRatio="none" viewBox="0 0 100 2">
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            strokeWidth="2"
            pathLength={1}
            className="draw-path animate-draw stroke-border [animation-play-state:var(--play,running)]"
          />
        </svg>
        <ol className="relative grid gap-3 md:grid-cols-3 md:gap-4">
          {forensic.pillars.map((pillar, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={pillar.title} delay={0.1 + i * 0.12} className="group/pillar">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-6 items-center justify-center rounded-md border border-border bg-canvas text-ink transition-colors duration-300 group-hover/pillar:border-primary group-hover/pillar:text-primary">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-3" />
                  </span>
                  <span className="font-mono text-label text-primary">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-1.5 text-base text-muted">{pillar.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </InView>

      <Reveal className="mt-8 lg:mt-12">
        <aside className="relative rounded-md border border-border bg-highlight py-3 pr-3 pl-4 lg:py-4 lg:pr-4 lg:pl-6">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-0.5 rounded-l-md bg-primary" />
          <p className="max-w-[880px] text-lg text-ink-soft">{emphasizeTools(forensic.highlight)}</p>
        </aside>
      </Reveal>
    </Section>
  );
}
