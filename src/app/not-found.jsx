import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Symbol } from "@/components/ui/logo";
import { notFoundContent } from "@/data/site";

export const metadata = {
  title: notFoundContent.title,
};

export default function NotFound() {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-surface-dark text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-dark" />
      <Container className="relative grid min-h-[100svh] items-center gap-6 pt-[152px] pb-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="animate-fade-up font-mono text-label text-primary-on-dark uppercase">Erro 404</p>
          <h1 className="animate-fade-up mt-2 text-3xl font-semibold lg:text-4xl" style={{ animationDelay: "100ms" }}>
            {notFoundContent.title}
          </h1>
          <p className="animate-fade-up mt-3 max-w-text text-lg text-on-dark-muted" style={{ animationDelay: "200ms" }}>
            {notFoundContent.text}
          </p>
          <p className="animate-fade-up mt-2 max-w-text text-lg text-on-dark" style={{ animationDelay: "260ms" }}>
            {notFoundContent.reassurance}
          </p>
          <ul className="animate-fade-up mt-6 border-t border-border-dark" style={{ animationDelay: "340ms" }}>
            {notFoundContent.links.map((link) => (
              <li key={link.href} className="border-b border-border-dark">
                <Link href={link.href} className="group/nf flex h-8 items-center justify-between text-lg font-medium">
                  {link.label}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-3 text-primary-on-dark transition-transform duration-300 group-hover/nf:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="relative hidden lg:col-span-5 lg:block">
          <p className="font-mono text-[160px] leading-none font-normal text-white/5">404</p>
          <Symbol tone="light" className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 opacity-20" />
        </div>
      </Container>
    </section>
  );
}
