export const intro = {
  eyebrow: "O DIFERENCIAL QUE MUDA O RESULTADO",
  title: "Tecnologia de nível internacional. No Brasil. No seu processo.",
  tagline:
    "Em perícia técnica, a qualidade do laudo depende do método, dos dados disponíveis e das ferramentas de análise empregadas.",
  statement: "A Infinity entendeu isso desde o início.",
  paragraphs: [
    "A Infinity dispõe de CDR Bosch®, CrashScan®, Virtual CRASH® e eCrash®, com licenças e capacitação técnica específica. Essas ferramentas são utilizadas por autoridades de trânsito, fabricantes de automóveis, universidades e centros de engenharia forense nos Estados Unidos e Europa.",
    "Ao trazer essa tecnologia para o mercado brasileiro de seguros e perícia, a Infinity entrega algo que poucos podem oferecer: laudos com base em dados objetivos, reconstituições em 3D e análises que reduzem a subjetividade dos relatos.",
    "O resultado é um laudo mais consistente, que acelera a regulação de sinistros e resiste melhor a questionamentos técnicos.",
  ],
};

export const technologies = [
  {
    id: "cdr-bosch",
    nav: "CDR Bosch®",
    visual: "edr",
    eyebrow: "REGISTRO DE DADOS ELETRÔNICOS QUE AJUDAM A RECONSTRUIR O ACIDENTE",
    title:
      "CDR Bosch®: extração e interpretação técnica de dados registrados pelos módulos eletrônicos do veículo.",
    blocks: [
      {
        heading: "Leitura e Análise de Dados Eletrônicos de Colisão (EDR)",
        paragraphs: [
          "Muitos veículos possuem módulos eletrônicos capazes de registrar informações relacionadas a eventos de colisão. Esses registros, conhecidos como Event Data Recorder (EDR), podem fornecer evidências técnicas relevantes para a investigação e reconstrução de acidentes de trânsito.",
          "Conforme o fabricante, modelo, ano e sistema eletrônico do veículo, podem estar disponíveis informações como:",
        ],
        items: [
          "Velocidade nos instantes anteriores à colisão;",
          "Acionamento dos freios e posição do acelerador;",
          "Variação de velocidade durante o impacto (Delta-V);",
          "Rotação e torque do motor;",
          "Utilização dos cintos de segurança;",
          "Acionamento dos airbags;",
          "Ângulo de esterçamento do volante;",
          "Outros parâmetros relacionados ao evento.",
        ],
        closing:
          "A análise desses registros complementa o exame dos vestígios físicos, das deformações dos veículos e das demais evidências disponíveis, contribuindo para a reconstrução da dinâmica do acidente e a avaliação técnica das circunstâncias da colisão.",
      },
      {
        heading: "CDR Bosch®: Crash Data Retrieval",
        paragraphs: [
          "O CDR Bosch® é uma ferramenta especializada na extração de dados eletrônicos de colisão armazenados em módulos de veículos compatíveis.",
          "Amplamente utilizado por profissionais de reconstrução de acidentes, autoridades e fabricantes de veículos, o sistema emprega hardware e software específicos para recuperar os registros e gerar relatórios técnicos que permitem sua interpretação pericial.",
        ],
      },
      {
        heading: "CrashScan®: Leitura e Análise de Dados EDR",
        paragraphs: [
          "O CrashScan® é uma solução de leitura de dados eletrônicos de colisão baseada em aplicativo móvel, com recursos de processamento e análise em nuvem.",
          "A tecnologia oferece equipamentos de custo acessível, treinamento de usuários, coleta de dados eletrônicos, análise personalizável, alertas estratégicos, geração de relatórios e suporte técnico especializado em engenharia.",
          "Sua utilização amplia as alternativas tecnológicas para obtenção e análise de registros eletrônicos em veículos compatíveis, complementando os recursos disponíveis para a investigação de acidentes de trânsito.",
        ],
      },
    ],
    cta: "Solicitar perícia com CDR Bosch®",
  },
  {
    id: "virtual-crash",
    nav: "Virtual CRASH®",
    visual: "reconstruction",
    eyebrow: "VER O ACIDENTE ANTES DE CONCLUIR O LAUDO",
    title: "Virtual CRASH®: reconstituição tridimensional com simulação física real.",
    tagline:
      "Software de reconstrução de acidentes de trânsito utilizado em diversos países, aplicado à análise técnica do seu caso.",
    blocks: [
      {
        heading: "O que o Virtual CRASH® faz:",
        paragraphs: [
          "É um software avançado projetado para reconstrução de acidentes, utilizado para criar simulações precisas, diagramas CAD e animações interativas.",
          "Ele é capaz de modelar ambientes complexos, veículos, pedestres e outros objetos, permitindo realizar simulações de colisões e cenários detalhados.",
          "É utilizado por autoridades, universidades e empresas de engenharia, oferecendo uma plataforma fácil de usar, com recursos avançados para diversas análises de acidentes de trânsito.",
          "Usa métodos baseados na física de colisões, combinando dinâmicas e cinemática para reconstruir cenários de acidentes.",
          "Ele aplica as leis de conservação de momento e energia, além de utilizar análise de impacto para calcular a movimentação de objetos durante a colisão.",
          "O software simula tanto o movimento antes quanto após o impacto, usando ferramentas avançadas de modelagem 3D e renderização. Isso permite aos engenheiros e especialistas realizarem análises detalhadas e precisas de acidentes.",
        ],
      },
      {
        heading: "Por que isso importa:",
        paragraphs: [
          "Um laudo convencional descreve o acidente. O Virtual CRASH® mostra o acidente, com dados, física e visualização tridimensional. A visualização tridimensional pode facilitar a compreensão técnica da dinâmica analisada por magistrados, advogados, reguladores, peritos e assistentes técnicos.",
        ],
      },
      {
        heading: "Aplicação:",
        paragraphs: [
          "Ferramenta especializada para simulação, reconstrução e análise técnica da dinâmica de acidentes de trânsito, permitindo avaliar diferentes cenários com base em princípios físicos, dados e evidências disponíveis.",
        ],
      },
      {
        heading: "Prazo de entrega:",
        paragraphs: ["O prazo será informado de acordo com o escopo e a disponibilidade do objeto periciado."],
      },
    ],
    cta: "Solicitar perícia com Virtual CRASH®",
  },
  {
    id: "ecrash",
    nav: "eCrash®",
    visual: "montecarlo",
    eyebrow: "PRECISÃO COM FAIXA DE INCERTEZA CALCULADA",
    title: "eCrash®: cálculo de velocidades com análise estatística avançada.",
    tagline:
      "Além de estimar a velocidade provável no impacto, o eCrash® informa com que quantificação da incerteza associada ao resultado esse cálculo foi feito, que é um diferencial relevante quando o laudo precisa resistir a questionamentos técnicos.",
    blocks: [
      {
        heading: "O que o Virtual eCrash® faz:",
        paragraphs: [
          "O eCrash® é uma plataforma avançada para análise de acidentes de trânsito, focada em cálculos precisos de velocidades e condições do impacto. Ele utiliza física e métodos estatísticos, incluindo o método de Monte Carlo, para analisar incertezas. O software é reconhecido por sua precisão, aplicando modelos como a conservação de momento e energia para simular diferentes cenários e gerar relatórios detalhados, considerando as margens de erro nas medições e parâmetros.",
        ],
      },
      {
        heading: "Por que isso importa:",
        paragraphs: [
          "O uso do eCrash® permite que a análise considere tecnicamente as variações e margens de erro dos parâmetros de entrada. Isso evita conclusões categóricas baseadas em premissas rígidas e entrega uma visão da faixa de velocidades mais provável, conferindo transparência, fundamentação matemática e rigor científico à investigação.",
        ],
      },
      {
        heading: "Aplicação jurídica:",
        paragraphs: [
          "Ao apresentar os resultados por meio de faixas percentílicas e distribuições estatísticas, o laudo evita questionamentos sobre arbitrariedade nos dados de entrada, oferecendo ao juiz, aos advogados e às partes uma fundamentação robusta e tecnicamente respaldada.",
        ],
      },
    ],
    cta: "Solicitar perícia com Virtual eCRASH®",
  },
  {
    id: "analise-de-video",
    nav: "Análise de Vídeo",
    visual: "video",
    eyebrow: "ANÁLISE DE VÍDEO",
    title: "Análise técnica de vídeos aplicada à reconstrução de acidentes.",
    tagline:
      "Câmeras de segurança, dashcams, celulares e sistemas embarcados registram, com frequência, o momento do acidente. A Infinity analisa essas imagens com método técnico e ferramentas específicas de tratamento e medição de vídeo, para extrair informações objetivas sobre a dinâmica do evento.",
    blocks: [
      {
        heading: "O que a análise de vídeo permite:",
        items: [
          "Determinação de velocidades e trajetórias a partir da posição dos veículos quadro a quadro e das referências fixas da cena",
          "Sincronização de múltiplas câmeras e correlação com os dados do EDR e com os vestígios de campo",
          "Análise e correção de efeitos de perspectiva e distorção óptica, com verificação da taxa de quadros",
          "Estabelecimento da sequência de eventos (pré-impacto, impacto e pós-impacto)",
          "Integração das informações extraídas à reconstrução em Virtual CRASH®",
        ],
      },
      {
        heading: "Por que isso importa:",
        paragraphs: [
          "O vídeo é um registro independente dos relatos das partes. Quando analisado com método, deixa de ser uma simples ilustração e passa a fornecer dados mensuráveis para a reconstrução. Ferramentas utilizadas: a Infinity utiliza softwares como Peritus e Adobe Premiere para análise quadro a quadro, sincronização de câmeras, medição e tratamento das imagens.",
        ],
      },
      {
        heading: "Aplicação:",
        paragraphs: [
          "Perícias de acidentes de trânsito, regulação de sinistros, assistência técnica judicial e análise de eventos registrados em imagens.",
        ],
      },
    ],
    cta: "Solicitar análise de vídeo",
  },
];

export const methodology = {
  eyebrow: "NOSSA METODOLOGIA",
  title: "Da solicitação ao laudo: um processo técnico sem atalhos.",
  steps: [
    {
      title: "Recebimento e análise da demanda",
      text: "Avaliamos o escopo, a documentação disponível e a necessidade de perícia presencial para definir a melhor abordagem técnica.",
    },
    {
      title: "Coleta de dados e perícia",
      text: "Realizamos a perícia técnica do objeto analisado, seja o veículo, a cena do acidente ou a instalação industrial. Coletamos os dados e vestígios relevantes com as ferramentas adequadas a cada caso.",
    },
    {
      title: "Análise e processamento",
      text: "Os dados são processados com metodologia técnica e científica e, quando aplicável, com suporte do CDR Bosch®, Virtual CRASH® ou eCrash®.",
    },
    {
      title: "Elaboração do laudo",
      text: "O parecer técnico é redigido com linguagem clara, estrutura lógica e fundamentação técnica sólida, adequada para processos judiciais e uso administrativo.",
    },
    {
      title: "Entrega e suporte",
      text: "Entregamos o laudo dentro do prazo acordado e nos colocamos à disposição para esclarecer dúvidas, responder quesitos complementares ou elaborar pareceres de concordância e impugnação.",
    },
  ],
  cta: { label: "Solicitar atendimento", href: "/contato#formulario" },
};
