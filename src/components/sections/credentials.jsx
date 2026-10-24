import { Building2, MapPinned, Plane } from "lucide-react";
import { Section } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { credentials } from "@/data/home";

const icons = [MapPinned, Building2, Plane];

export function Credentials({ index = "04" }) {
  return (
    <Section tone="light">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-14">
            <SectionHeading index={index} eyebrow={credentials.eyebrow} title={credentials.title} />
          </div>
        </div>
        <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
          {credentials.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.1}
                className="group/cred relative grid grid-cols-[48px_1fr] items-start gap-2 border-b border-border py-4 sm:grid-cols-[64px_48px_1fr] lg:py-5"
              >
                <span className="font-mono text-2xl text-primary max-sm:hidden">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex size-6 items-center justify-center rounded-md border border-border text-ink transition-colors duration-300 group-hover/cred:border-ink group-hover/cred:bg-ink group-hover/cred:text-white">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-3" />
                </span>
                <p className="text-lg text-ink md:text-xl">{item}</p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out-expo group-hover/cred:scale-x-100"
                />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
