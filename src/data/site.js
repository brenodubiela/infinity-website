import { companyData } from "@/data/legal-texts";

export const siteName = "Infinity Engenharia e Perícias";

export const headerCta = { label: "Solicite uma perícia", href: "/contato#formulario" };

export const footer = {
  razaoSocial: "Infinity Engenharia e Perícias LTDA",
  endereco: "Pomerode, SC, Brasil | Atuação em todo o Brasil",
  email: companyData.emailContato,
  nav: [
    { label: "Home", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Serviços", href: "/servicos" },
    { label: "Tecnologia", href: "/tecnologia" },
    { label: "Contato", href: "/contato" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  ],
  social: [
    { label: "LinkedIn", href: "" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
  copyright: "© 2026 Infinity Engenharia e Perícias. Todos os direitos reservados.",
};

export const seo = {
  home: {
    title: "Infinity Engenharia e Perícias | Forense e Laudos",
    description:
      "Perícias técnicas, laudos de engenharia e assistência técnica judicial. Tecnologia internacional, rigor científico e atuação em todo o Brasil.",
  },
  sobre: {
    title: "Sobre a Infinity | Engenharia e Perícias Forenses",
    description:
      "Conheça a Infinity Engenharia e Perícias. Liderada pelo Eng. Emerson Costa, unimos ética, tecnologia e atuação nacional com padrão internacional.",
  },
  servicos: {
    title: "Serviços de Engenharia Pericial | Infinity Engenharia",
    description:
      "Reconstrução de acidentes, perícias em incêndios, inspeções industriais e assistência técnica judicial com embasamento científico e rigor técnico.",
  },
  tecnologia: {
    title: "Tecnologias Periciais: CDR, Virtual CRASH e eCrash",
    description:
      "CDR Bosch®, Virtual CRASH® e eCrash®: tecnologia de ponta em reconstrução 3D de acidentes e análise probabilística a serviço do seu processo.",
  },
  contato: {
    title: "Fale com a Infinity | Perícias em Engenharia",
    description:
      "Entre em contato com a equipe da Infinity Engenharia e Perícias. Atendimento especializado, ágil e criterioso em todo o território nacional.",
  },
};

export const notFoundContent = {
  title: "404 - Página não encontrada",
  text: "O endereço que você tentou acessar não existe, foi removido ou está temporariamente indisponível.",
  reassurance: "Mas não se preocupe: a precisão do nosso site continua intacta.",
  links: [
    { label: "Voltar para a Home", href: "/" },
    { label: "Conhecer nossos Serviços", href: "/servicos" },
    { label: "Solicitar Perícia / Fale Conosco", href: "/contato" },
  ],
};

export const altTexts = {
  logo: "Logo da Infinity Engenharia e Perícias com o símbolo do infinito.",
  emerson:
    "Engenheiro Emerson Costa, especialista em perícias forenses e fundador da Infinity Engenharia.",
  cdr: "Módulo CDR Bosch utilizado na extração de dados eletrônicos de acidentes veiculares.",
  virtualCrash:
    "Software Virtual CRASH exibindo reconstituição tridimensional e simulação física 3D de colisão.",
  ecrash: "Gráfico de análise estatística e probabilística de velocidades gerado pelo eCrash.",
};

export function whatsappHref(message) {
  if (!companyData.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${companyData.whatsapp}${text}`;
}
