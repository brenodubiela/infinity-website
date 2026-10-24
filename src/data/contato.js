export const contactHero = {
  eyebrow: "FALE COM A INFINITY",
  title: "Tem uma demanda técnica? Fale com a Infinity.",
  tagline:
    "Seja para elaboração de laudos ou demandas específicas de engenharia, análise de sinistros, assistência técnica em processos judiciais, a Infinity oferece atendimento técnico especializado, ágil e criterioso.",
};

export const contactForm = {
  fields: {
    nome: "Nome completo *",
    empresa: "Empresa",
    telefone: "Telefone / WhatsApp *",
    email: "E-mail *",
    tipo: "Tipo de demanda *",
    uf: "UF do evento ou do objeto periciado",
    descricao: "Descrição da demanda *",
  },
  demandTypes: [
    "Sinistro",
    "Assistência Técnica Judicial",
    "Perícia Extrajudicial",
    "Consultoria",
    "Treinamento",
    "Outro",
  ],
  consent:
    "Ao enviar este formulário, você concorda com o tratamento dos seus dados exclusivamente para o atendimento de sua solicitação e comunicação referente aos serviços da Infinity. Consulte nossa",
  consentLink: "Política de Privacidade",
  submit: "Enviar solicitação",
};

export const formMessages = {
  required: "Campo obrigatório.",
  invalidEmail: "Informe um e-mail válido.",
  invalidPhone: "Informe um telefone com DDD.",
  shortDescription: "Descreva a demanda com pelo menos 10 caracteres.",
  consentRequired: "É necessário concordar com o tratamento dos dados.",
  sending: "Enviando...",
  successTitle: "Solicitação enviada.",
  successText: "Recebemos sua demanda. A equipe da Infinity entrará em contato em breve.",
  successAgain: "Enviar outra solicitação",
  errorText: "Não foi possível enviar agora. Tente novamente ou fale com a Infinity pelo e-mail contato@infinity.eng.br.",
  selectPlaceholder: "Selecione",
};

export const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export const whatsappSection = {
  cta: "Chamar no WhatsApp",
};

export const institutional = [
  { label: "Empresa:", value: "Infinity Engenharia e Perícias" },
  { label: "Responsável Técnico:", value: "Emerson Marques Costa, Engenheiro Mecânico" },
  { label: "Sede:", value: "Pomerode, SC" },
  { label: "Site:", value: "www.infinity.eng.br", href: "https://www.infinity.eng.br" },
];

export const coverage = {
  label: "Atuação",
  eyebrow: "ONDE ESTAMOS",
  title: "Cobertura nacional. Presença estratégica.",
  tagline:
    "A Infinity atua em todo o território brasileiro, com operações coordenadas a partir da sede em Pomerode, SC e suporte de pontos de apoio operacional estrategicamente distribuídos.",
  hq: {
    title: "Sede em Pomerode, SC.",
    text: "Centro Técnico de Operações da Infinity, responsável pela coordenação das perícias, processamento dos dados e elaboração dos trabalhos técnicos.",
  },
  support: {
    title: "Pontos de Apoio Operacional",
    text: "Estruturas localizadas em pontos estratégicos do Brasil, ampliando a capacidade de atendimento, a agilidade operacional e a eficiência logística das demandas periciais.",
  },
  cta: { label: "Solicitar atendimento na minha região", href: "/contato#formulario" },
};

export const contactFinalCta = {
  title: "Precisão técnica começa com o contato certo.",
  tagline:
    "Fale com o time da Infinity e apresente sua demanda. Nossa equipe avaliará o caso e indicará a abordagem técnica mais adequada para sua necessidade.",
  cta: { label: "Enviar solicitação", href: "#formulario" },
};
