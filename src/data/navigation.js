import { aboutTeaser, servicesTeaser, technologyTeaser } from "@/data/home";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { innovation, international, origin, specialist, structure } from "@/data/sobre";
import { intro, methodology, technologies } from "@/data/tecnologia";

export const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre", mega: "sobre" },
  { label: "Serviços", href: "/servicos", mega: "servicos" },
  { label: "Tecnologia", href: "/tecnologia", mega: "tecnologia" },
  { label: "Contato", href: "/contato" },
];

const techCards = Object.fromEntries(technologyTeaser.cards.map((card) => [card.href.split("#")[1], card.title]));

export const megaMenus = {
  sobre: {
    eyebrow: aboutTeaser.eyebrow,
    title: aboutTeaser.title,
    cta: aboutTeaser.cta,
    image: images.sobreHero,
    columns: 1,
    links: [
      { label: "Nossa origem", href: "/sobre#origem", description: origin.tagline, icon: "origin" },
      { label: "O especialista", href: "/sobre#especialista", description: specialist.title, icon: "specialist" },
      {
        label: "Presença internacional",
        href: "/sobre#presenca-internacional",
        description: international.title,
        icon: "international",
      },
      { label: "Tecnologia interna", href: "/sobre#tecnologia-interna", description: innovation.tagline, icon: "process" },
      { label: "Nossa estrutura", href: "/sobre#estrutura", description: structure.title, icon: "structure" },
    ],
  },
  servicos: {
    eyebrow: servicesTeaser.eyebrow,
    title: servicesTeaser.title,
    cta: servicesTeaser.cta,
    image: images.servicosHero,
    columns: 2,
    links: services.map((service) => ({
      label: service.name,
      href: `/servicos/${service.slug}`,
      description: service.title,
      service: service.icon,
    })),
  },
  tecnologia: {
    eyebrow: technologyTeaser.eyebrow,
    title: intro.title,
    cta: technologyTeaser.cta,
    image: images.tecnologiaHero,
    columns: 1,
    links: [
      ...technologies.map((tech) => ({
        label: tech.nav,
        href: `/tecnologia#${tech.id}`,
        description: techCards[tech.id] ?? tech.title,
        icon: tech.visual,
      })),
      { label: "Metodologia", href: "/tecnologia#metodologia", description: methodology.title, icon: "method" },
    ],
  },
};
