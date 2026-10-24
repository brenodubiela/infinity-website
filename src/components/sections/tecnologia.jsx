import Image from "next/image";
import {
  Atom,
  Box,
  CalendarClock,
  Cctv,
  Cpu,
  Ellipsis,
  FileChartColumn,
  Focus,
  Gauge,
  Globe,
  History,
  Landmark,
  LifeBuoy,
  Lightbulb,
  ListOrdered,
  Map as MapIcon,
  Move,
  OctagonMinus,
  RotateCw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sigma,
  Smartphone,
  Target,
  TrendingDown,
} from "lucide-react";
import { Section } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MethodSteps } from "@/components/sections/method-steps";
import { EdrChart } from "@/components/illustrations/edr-chart";
import { MonteCarloChart } from "@/components/illustrations/montecarlo-chart";
import { ReconstructionScene } from "@/components/illustrations/reconstruction-scene";
import { VideoFrames } from "@/components/illustrations/video-frames";
import { intro, methodology } from "@/data/tecnologia";
import { technologyTeaser } from "@/data/home";
import { images } from "@/data/images";
import { cn } from "@/utils/cn";

const KEY_TERMS = [
  "CDR Bosch®",
  "CrashScan®",
  "Virtual CRASH®",
  "eCrash®",
  "Event Data Recorder (EDR)",
  "método de Monte Carlo",
  "conservação de momento e energia",
  "faixas percentílicas e distribuições estatísticas",
  "Peritus e Adobe Premiere",
  "dados objetivos, reconstituições em 3D",
];
const TERM_PATTERN = new RegExp(`(${KEY_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

export function emphasize(text, className = "font-semibold text-ink") {
  return text.split(TERM_PATTERN).map((part, i) =>
    KEY_TERMS.includes(part) ? (
      <strong key={i} className={className}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const visuals = {
  edr: (tone) => <EdrChart tone={tone} compact />,
  reconstruction: (tone) => <ReconstructionScene tone={tone} />,
  montecarlo: (tone) => <MonteCarloChart tone={tone} compact />,
  video: (tone) => <VideoFrames tone={tone} />,
};

const photos = {
  edr: images.techCdr,
  reconstruction: images.techVirtualCrash,
  montecarlo: images.techEcrash,
};

const itemIcons = {
  "cdr-bosch": [Gauge, OctagonMinus, TrendingDown, RotateCw, ShieldCheck, ShieldAlert, LifeBuoy, Ellipsis],
  "analise-de-video": [Move, Cctv, Focus, ListOrdered, Box],
};

const featureIcons = [Box, MapIcon, Landmark, Atom, Sigma, History];

const infoIcons = {
  "Aplicação:": Target,
  "Aplicação jurídica:": Scale,
  "Prazo de entrega:": CalendarClock,
};

const INFO_HEADINGS = Object.keys(infoIcons);

function stripColon(text) {
  return text.replace(/:$/, "");
}

export function TechFigure({ visual, tone = "light", className }) {
  const dark = tone === "dark";
  const photo = photos[visual];
  return (
    <figure
      className={cn(
        "rounded-md border p-2 sm:p-3",
        dark ? "border-border-dark bg-surface-dark" : "border-border bg-canvas",
        className,
      )}
    >
      {photo && (
        <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-sm bg-surface-dark">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
        </div>
      )}
      <InView className="data-[inview=false]:[--play:paused]">{visuals[visual](tone)}</InView>
    </figure>
  );
}

const introIcons = [Globe, FileChartColumn, ShieldCheck];

export function TechIntro() {
  return (
    <Section tone="light">
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
        <Reveal className="lg:col-span-6">
          <figure className="group/intro relative overflow-hidden rounded-lg">
            <div className="relative aspect-[4/3]">
              <Image
                src={images.tecnologiaIntro.src}
                alt={images.tecnologiaIntro.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover/intro:scale-105"
              />
            </div>
            <ul className="absolute inset-x-2 bottom-2 flex flex-wrap gap-1">
              {technologyTeaser.tools.map((tool, i) => (
                <Reveal
                  as="li"
                  key={tool}
                  delay={0.2 + i * 0.08}
                  className="flex h-5 items-center rounded-sm bg-surface-dark/85 px-1.5 font-mono text-xs text-on-dark backdrop-blur-sm"
                >
                  {tool}
                </Reveal>
              ))}
            </ul>
          </figure>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <span aria-hidden="true" className="block h-[2px] w-8 bg-primary" />
            <p className="mt-3 text-2xl font-semibold text-ink lg:text-3xl">{intro.statement}</p>
          </Reveal>
          <ul className="mt-5 flex flex-col">
            {intro.paragraphs.map((paragraph, i) => {
              const Icon = introIcons[i];
              const last = i === intro.paragraphs.length - 1;
              return (
                <Reveal as="li" key={i} delay={0.1 + i * 0.1} className="flex gap-2 border-t border-border py-3">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md",
                      last ? "bg-primary text-white" : "bg-surface-muted text-ink",
                    )}
                  >
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-2.5" />
                  </span>
                  <p className={cn("text-base", last ? "font-medium text-ink" : "text-muted")}>{emphasize(paragraph)}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function SubHeading({ children, dark }) {
  return <h3 className={cn("text-xl font-semibold", dark ? "text-on-dark" : "text-ink")}>{children}</h3>;
}

function Callout({ block }) {
  const [first, ...rest] = block.paragraphs[0].split(/(?<=\.)\s+/);
  return (
    <Reveal>
      <aside className="relative rounded-md border border-border bg-highlight py-3 pr-3 pl-4">
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-0.5 rounded-l-md bg-primary" />
        <p className="flex items-center gap-1 font-mono text-label text-primary uppercase">
          <Lightbulb aria-hidden="true" strokeWidth={1.5} className="size-2" />
          {stripColon(block.heading)}
        </p>
        <p className="mt-1.5 text-lg font-semibold text-ink">{emphasize(first)}</p>
        {rest.length > 0 && <p className="mt-1 text-base text-muted">{emphasize(rest.join(" "))}</p>}
      </aside>
    </Reveal>
  );
}

function InfoCards({ blocks }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {blocks.map((block, i) => {
        const Icon = infoIcons[block.heading];
        return (
          <Reveal key={block.heading} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-md border border-border bg-canvas p-3">
              <span className="flex size-5 items-center justify-center rounded-md bg-surface-muted text-ink">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-2.5" />
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">{stripColon(block.heading)}</h3>
              <p className="mt-1 text-sm text-muted">{emphasize(block.paragraphs[0])}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function ToolCards({ blocks }) {
  const toolIcons = [Cpu, Smartphone];
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {blocks.map((block, i) => {
        const [tool, subtitle] = block.heading.split(/:\s*/);
        const Icon = toolIcons[i] ?? Cpu;
        return (
          <Reveal key={block.heading} delay={i * 0.1}>
            <article className="flex h-full flex-col rounded-md border border-border bg-canvas p-3">
              <div className="flex items-center gap-1.5">
                <span className="flex size-5 items-center justify-center rounded-md bg-ink text-white">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-2.5" />
                </span>
                <span className="font-mono text-sm text-ink">{tool}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-ink">{subtitle}</h3>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-muted">
                    {emphasize(paragraph)}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

function IconGrid({ block, icons }) {
  return (
    <div>
      <Reveal>
        <SubHeading>{block.heading}</SubHeading>
      </Reveal>
      {block.paragraphs?.map((paragraph) => (
        <Reveal key={paragraph}>
          <p className="mt-2 text-base text-muted">{emphasize(paragraph)}</p>
        </Reveal>
      ))}
      <ul className="mt-3 grid gap-1 sm:grid-cols-2">
        {block.items.map((item, i) => {
          const Icon = icons?.[i] ?? Ellipsis;
          return (
            <Reveal
              as="li"
              key={item}
              delay={Math.min(i * 0.05, 0.35)}
              className="group/item flex items-start gap-1.5 rounded-md border border-border bg-canvas p-1.5 transition-colors duration-300 hover:border-ink/40"
            >
              <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-surface-muted text-ink transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-white">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-2" />
              </span>
              <span className="text-sm text-ink">{item}</span>
            </Reveal>
          );
        })}
      </ul>
      {block.closing && (
        <Reveal>
          <p className="mt-3 border-l-2 border-signature-line pl-2 text-sm text-muted">{emphasize(block.closing)}</p>
        </Reveal>
      )}
    </div>
  );
}

function FeatureGrid({ block }) {
  return (
    <div>
      <Reveal>
        <SubHeading>{block.heading}</SubHeading>
      </Reveal>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {block.paragraphs.map((paragraph, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <Reveal as="li" key={paragraph} delay={(i % 2) * 0.08}>
              <div className="flex h-full gap-1.5 rounded-md border border-border bg-canvas p-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-surface-muted text-ink">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-2" />
                </span>
                <p className="text-sm text-muted">{emphasize(paragraph)}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}

function LeadBlock({ block }) {
  return (
    <div>
      <Reveal>
        <SubHeading>{block.heading}</SubHeading>
      </Reveal>
      {block.paragraphs.map((paragraph) => (
        <Reveal key={paragraph}>
          <p className="mt-2 text-lg text-ink-soft">{emphasize(paragraph)}</p>
        </Reveal>
      ))}
    </div>
  );
}

function groupBlocks(tech) {
  const groups = [];
  for (const block of tech.blocks) {
    const kind = block.heading.startsWith("Por que")
      ? "callout"
      : INFO_HEADINGS.includes(block.heading)
        ? "info"
        : /^(CDR Bosch®|CrashScan®):/.test(block.heading)
          ? "tool"
          : block.items
            ? "items"
            : block.paragraphs.length > 1
              ? "features"
              : "lead";
    const last = groups[groups.length - 1];
    if ((kind === "info" || kind === "tool") && last?.kind === kind) {
      last.blocks.push(block);
    } else {
      groups.push({ kind, blocks: [block] });
    }
  }
  return groups;
}

function TechBlocks({ tech }) {
  return groupBlocks(tech).map((group, i) => {
    const key = `${group.kind}-${i}`;
    if (group.kind === "callout") return <Callout key={key} block={group.blocks[0]} />;
    if (group.kind === "info") return <InfoCards key={key} blocks={group.blocks} />;
    if (group.kind === "tool") return <ToolCards key={key} blocks={group.blocks} />;
    if (group.kind === "items") return <IconGrid key={key} block={group.blocks[0]} icons={itemIcons[tech.id]} />;
    if (group.kind === "features") return <FeatureGrid key={key} block={group.blocks[0]} />;
    return <LeadBlock key={key} block={group.blocks[0]} />;
  });
}

export function TechDetail({ tech, index, reverse = false, tone = "light" }) {
  return (
    <section
      id={tech.id}
      data-tone="light"
      className={cn("scroll-mt-8 py-10 lg:py-16", tone === "muted" ? "bg-surface-muted" : "bg-canvas")}
    >
      <div className="mx-auto grid max-w-site gap-6 px-2 sm:px-3 lg:grid-cols-12 lg:gap-4 lg:px-4">
        <div className={cn("lg:col-span-7", reverse && "lg:order-2 lg:col-start-6")}>
          <SectionHeading index={index} eyebrow={tech.eyebrow} title={tech.title} lead={tech.tagline} size="sm" />
          <div className="mt-6 flex flex-col gap-5">
            <TechBlocks tech={tech} />
          </div>
          <Reveal className="mt-6">
            <Button href="/contato#formulario">{tech.cta}</Button>
          </Reveal>
        </div>
        <div className={cn("lg:col-span-4", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
          <Reveal className="lg:sticky lg:top-20">
            <TechFigure visual={tech.visual} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Methodology({ index }) {
  return (
    <Section tone="dark" id="metodologia" className="scroll-mt-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark" />
      <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <SectionHeading index={index} eyebrow={methodology.eyebrow} title={methodology.title} tone="dark" />
            <Reveal delay={0.2} className="mt-5">
              <Button href={methodology.cta.href}>{methodology.cta.label}</Button>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <MethodSteps
            steps={methodology.steps.map((step) => ({
              title: step.title,
              content: emphasize(step.text, "font-semibold text-on-dark"),
            }))}
            label={methodology.eyebrow}
          />
        </div>
      </div>
    </Section>
  );
}
