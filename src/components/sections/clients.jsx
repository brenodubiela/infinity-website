import Image from "next/image";
import { Section } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { clientLogos } from "@/data/client-logos";
import { clients } from "@/data/home";

const items = clients.names.map((name) => ({ name, logo: clientLogos[name] }));
const half = Math.ceil(items.length / 2);
const rows = [items.slice(0, half), items.slice(half)];

function ClientMark({ item }) {
  if (!item.logo) {
    return (
      <span className="text-xl font-semibold whitespace-nowrap text-muted transition-colors duration-300 hover:text-ink md:text-2xl">
        {item.name}
      </span>
    );
  }
  return (
    <Image
      src={item.logo.src}
      alt=""
      width={item.logo.width}
      height={item.logo.height}
      style={{ width: item.logo.width, height: item.logo.height }}
      className="max-w-none object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function Clients({ index = "05" }) {
  return (
    <Section tone="light" className="border-t border-border">
      <SectionHeading index={index} eyebrow={clients.eyebrow} title={clients.title} align="center" />
      <Reveal
        delay={0.2}
        className="mt-6 flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,black_64px,black_calc(100%-64px),transparent)] lg:mt-8"
      >
        {rows.map((row, r) => (
          <Marquee
            key={r}
            items={row}
            getKey={(item) => item.name}
            getLabel={(item) => item.name}
            renderItem={(item) => <ClientMark item={item} />}
            label={`${clients.eyebrow} ${r + 1}`}
            className={r === 1 ? "[&>div]:[animation-direction:reverse]" : undefined}
            itemClassName="h-8 px-4"
          />
        ))}
      </Reveal>
    </Section>
  );
}
