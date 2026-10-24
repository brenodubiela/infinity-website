import { LibraryShell } from "@/components/design-system/library-shell";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BulletList } from "@/components/ui/bullet-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { Logo, Seal, Symbol } from "@/components/ui/logo";
import { Marquee } from "@/components/ui/marquee";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Ruler } from "@/components/ui/ruler";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { AudienceBox } from "@/components/sections/servicos";
import { ServiceCard } from "@/components/sections/services-grid";
import { BrazilMap } from "@/components/illustrations/brazil-map";
import { EdrChart } from "@/components/illustrations/edr-chart";
import { MonteCarloChart } from "@/components/illustrations/montecarlo-chart";
import { ReconstructionScene } from "@/components/illustrations/reconstruction-scene";
import { SymbolConstruction } from "@/components/illustrations/symbol-construction";
import { VideoFrames } from "@/components/illustrations/video-frames";
import { FireOriginPlan } from "@/components/illustrations/fire-origin-plan";
import { MachineDiagnostics } from "@/components/illustrations/machine-diagnostics";
import { TechnicalDrawing } from "@/components/illustrations/technical-drawing";
import { VehicleInspection } from "@/components/illustrations/vehicle-inspection";
import { services } from "@/data/services";

const colors = [
  { token: "canvas", hex: "#FFFFFF", role: "Fundo principal", className: "bg-canvas" },
  { token: "ink", hex: "#1B2430", role: "Grafite: marca, títulos, texto", className: "bg-ink" },
  { token: "ink-soft", hex: "#3F4B58", role: "Texto técnico, cotas", className: "bg-ink-soft" },
  { token: "muted", hex: "#5A636E", role: "Texto de apoio (6,10:1)", className: "bg-muted" },
  { token: "graphic", hex: "#8A9199", role: "Só elemento gráfico", className: "bg-graphic" },
  { token: "silver", hex: "#C7CDD4", role: "Apoio sobre grafite", className: "bg-silver" },
  { token: "signature-line", hex: "#CFD5DB", role: "Filete da assinatura", className: "bg-signature-line" },
  { token: "border", hex: "#E6E8EB", role: "Filetes e divisórias", className: "bg-border" },
  { token: "surface-muted", hex: "#F4F5F7", role: "Fundo alternado", className: "bg-surface-muted" },
  { token: "highlight", hex: "#FCF6F6", role: "Caixa de destaque", className: "bg-highlight" },
  { token: "primary", hex: "#C8102E", role: "Acento (máx. 10% da tela)", className: "bg-primary" },
  { token: "primary-hover", hex: "#A00D25", role: "Hover do vermelho", className: "bg-primary-hover" },
  { token: "primary-on-dark", hex: "#E24B4A", role: "Vermelho sobre escuro", className: "bg-primary-on-dark" },
  { token: "surface-dark", hex: "#1B2430", role: "Seções escuras", className: "bg-surface-dark" },
  { token: "surface-deep", hex: "#12181F", role: "Rodapé, fundo profundo", className: "bg-surface-deep" },
  { token: "border-dark", hex: "#2C3742", role: "Filete sobre escuro", className: "bg-border-dark" },
  { token: "on-dark-muted", hex: "#A8B1BA", role: "Apoio sobre escuro", className: "bg-on-dark-muted" },
];

const typeScale = [
  { token: "text-hero", spec: "64 / 72", sample: "Onde a engenharia encontra" },
  { token: "text-4xl", spec: "48 / 56", sample: "Reconstrução de acidentes" },
  { token: "text-3xl", spec: "40 / 48", sample: "Título de página" },
  { token: "text-2xl", spec: "32 / 40", sample: "Título de seção" },
  { token: "text-xl", spec: "24 / 32", sample: "Subtítulo e cartão" },
  { token: "text-lg", spec: "20 / 32", sample: "Lead da seção, texto de apoio maior." },
  { token: "text-base", spec: "16 / 24", sample: "Texto corrido em IBM Plex Sans 400." },
  { token: "text-sm", spec: "14 / 24", sample: "Texto de apoio e legendas." },
];

const spacing = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

const categories = [
  {
    id: "fundamentos",
    label: "Fundamentos",
    title: "Tokens da marca",
    description:
      "Cores, tipografia, espaço e forma extraídos do Manual da Marca v1.3.1. Defaults do Tailwind estão desligados: só estes tokens existem.",
    items: [
      {
        name: "Cores",
        description: "bg-*, text-*, border-*, fill-*, stroke-* com os nomes abaixo.",
        preview: (
          <ul className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
            {colors.map((color) => (
              <li key={color.token} className="flex items-center gap-1.5 rounded-md border border-border bg-canvas p-1">
                <span className={`size-5 shrink-0 rounded-sm border border-border ${color.className}`} />
                <span className="min-w-0">
                  <span className="block font-mono text-xs font-medium text-ink">{color.token}</span>
                  <span className="block font-mono text-xs text-muted">
                    {color.hex} · {color.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ),
        code: `<p className="text-muted">Texto de apoio</p>\n<section className="bg-surface-dark text-on-dark">...</section>`,
      },
      {
        name: "Tipografia",
        description: "IBM Plex Sans 400/500/600 e IBM Plex Mono 400 via next/font.",
        preview: (
          <ul className="flex flex-col gap-2">
            {typeScale.map((type) => (
              <li key={type.token} className="grid items-baseline gap-1 border-b border-border pb-2 sm:grid-cols-[160px_1fr]">
                <span className="font-mono text-xs text-muted">
                  {type.token} · {type.spec}
                </span>
                <span className={`${type.token} truncate font-semibold`}>{type.sample}</span>
              </li>
            ))}
            <li className="grid items-baseline gap-1 sm:grid-cols-[160px_1fr]">
              <span className="font-mono text-xs text-muted">text-label · mono</span>
              <span className="font-mono text-label text-muted uppercase">Tabela 4. Velocidades calculadas</span>
            </li>
          </ul>
        ),
        code: `<h2 className="text-2xl lg:text-3xl font-semibold">...</h2>\n<p className="font-mono text-label uppercase">Rótulo</p>`,
      },
      {
        name: "Espaço (malha de 8)",
        description: "1 unidade = 8 px. p-1 = 8, gap-3 = 24, py-16 = 128.",
        preview: (
          <ul className="flex flex-col gap-1">
            {spacing.map((step) => (
              <li key={step} className="flex items-center gap-2">
                <span className="w-6 font-mono text-xs text-muted">{step}</span>
                <span className="h-1 bg-ink" style={{ width: step * 8 }} />
                <span className="font-mono text-xs text-muted">{step * 8}px</span>
              </li>
            ))}
          </ul>
        ),
        code: `<div className="px-2 sm:px-3 lg:px-4 py-10 lg:py-16">...</div>`,
      },
      {
        name: "Forma e régua",
        description: "Raio 4 / 8 / 16, filete de 1 px, régua técnica dos heros.",
        preview: (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <span className="size-8 rounded-sm border border-ink" />
              <span className="size-8 rounded-md border border-ink" />
              <span className="size-8 rounded-lg border border-ink" />
            </div>
            <Ruler tone="light" />
          </div>
        ),
        code: `<Ruler tone="light" />`,
      },
    ],
  },
  {
    id: "marca",
    label: "Marca",
    title: "Assinaturas",
    description: "Path oficial do símbolo (136 × 56, traço 8). Nunca em vermelho, sem sombra, sem distorção.",
    items: [
      {
        name: "Logo horizontal e reduzida",
        description: "Horizontal ≥ 280 px. Reduzida ≥ 96 px.",
        preview: (
          <div className="flex flex-col gap-3">
            <Logo variant="horizontal" className="w-[280px]" />
            <Logo variant="reduzida" className="w-[160px]" />
          </div>
        ),
        code: `<Logo variant="horizontal" tone="dark" className="w-[280px]" />`,
      },
      {
        name: "Versão negativa",
        dark: true,
        preview: <Logo variant="horizontal" tone="light" className="w-[280px]" />,
        code: `<Logo variant="horizontal" tone="light" />`,
      },
      {
        name: "Símbolo e selo",
        preview: (
          <div className="flex items-center gap-4">
            <Symbol tone="dark" className="w-[136px]" title="Símbolo Infinity" />
            <Seal className="size-12" label="Selo Infinity" />
          </div>
        ),
        code: `<Symbol tone="dark" className="w-[136px]" />\n<Seal className="size-12" />`,
      },
    ],
  },
  {
    id: "buttons",
    label: "Buttons",
    title: "Botões e links de ação",
    description: "Altura 48 (md) ou 40 (sm). href interno vira next/link. Seta desliza no hover.",
    items: [
      {
        name: "Button sobre claro",
        preview: (
          <div className="flex flex-wrap gap-1.5">
            <Button href="/contato">Primary</Button>
            <Button href="/contato" variant="secondary">
              Secondary
            </Button>
            <Button href="/contato" variant="outline">
              Outline
            </Button>
            <Button href="/contato" variant="ghost">
              Ghost
            </Button>
            <Button href="/contato" size="sm">
              Small
            </Button>
          </div>
        ),
        code: `<Button href="/contato">Solicite uma perícia</Button>\n<Button variant="outline" size="sm">...</Button>`,
      },
      {
        name: "Button sobre escuro",
        dark: true,
        preview: (
          <div className="flex flex-wrap gap-1.5">
            <Button href="/contato">CTA (primary)</Button>
            <Button href="/contato" variant="outline-light" arrow={false}>
              Outline light
            </Button>
          </div>
        ),
        code: `<Button href="/contato">Fale com a Infinity</Button>  // CTA é sempre primary, em qualquer fundo`,
      },
      {
        name: "ArrowLink",
        preview: <ArrowLink href="/tecnologia">Saiba mais</ArrowLink>,
        code: `<ArrowLink href="/tecnologia#ecrash">Saiba mais</ArrowLink>`,
      },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    title: "Navegação",
    description: "TextLink com borda inferior vermelha no hover e no ativo. Breadcrumbs com JSON-LD.",
    items: [
      {
        name: "TextLink",
        preview: (
          <div className="flex gap-3">
            <TextLink href="/sobre">Normal</TextLink>
            <TextLink href="/servicos" active>
              Ativo
            </TextLink>
          </div>
        ),
        code: `<TextLink href="/servicos" active={isActive}>Serviços</TextLink>`,
      },
      {
        name: "Breadcrumbs",
        preview: <Breadcrumbs tone="light" items={[{ label: "Serviços", href: "/servicos" }]} />,
        code: `<Breadcrumbs items={[{ label: "Serviços", href: "/servicos" }]} />`,
      },
    ],
  },
  {
    id: "eyebrow-lists",
    label: "Eyebrow & Lists",
    title: "Rótulos, títulos e listas",
    items: [
      {
        name: "Eyebrow",
        preview: <Eyebrow index="01">Engenharia forense</Eyebrow>,
        code: `<Eyebrow index="01">ENGENHARIA FORENSE</Eyebrow>`,
      },
      {
        name: "SectionHeading",
        preview: (
          <SectionHeading
            index="02"
            eyebrow="NOSSOS SERVIÇOS"
            title="Soluções periciais para cada tipo de sinistro e litígio."
            lead="Lead da seção em text-lg, cor muted."
          />
        ),
        code: `<SectionHeading index="02" eyebrow="..." title="..." lead="..." />`,
      },
      {
        name: "BulletList",
        preview: <BulletList items={services[0].items.slice(0, 3)} numbered />,
        code: `<BulletList items={service.items} numbered />`,
      },
      {
        name: "Tag",
        preview: (
          <div className="flex gap-1">
            <Tag>CDR Bosch®</Tag>
            <Tag>NFPA 921</Tag>
          </div>
        ),
        code: `<Tag>NFPA 921</Tag>`,
      },
    ],
  },
  {
    id: "cards",
    label: "Cards",
    title: "Cartões e caixas",
    items: [
      {
        name: "ServiceCard",
        description: "Card com filete superior vermelho no hover.",
        preview: (
          <div className="max-w-[320px]">
            <ServiceCard service={services[1]} index={1} />
          </div>
        ),
        code: `<ServiceCard service={service} index={i} />`,
      },
      {
        name: "Card genérico",
        preview: (
          <div className="max-w-[320px]">
            <Card className="p-3">
              <p className="font-mono text-label text-primary">01</p>
              <p className="mt-2 text-lg font-semibold">Conteúdo do cartão</p>
            </Card>
          </div>
        ),
        code: `<Card href="/rota" className="p-3">...</Card>`,
      },
      {
        name: "Caixa de destaque (Para quem)",
        preview: <AudienceBox text={services[0].audience} />,
        code: `<AudienceBox text={service.audience} />`,
      },
      {
        name: "PhotoPlaceholder",
        description: "Espaço reservado até a chegada das fotos reais.",
        preview: (
          <div className="max-w-[240px]">
            <PhotoPlaceholder label="Foto" caption="Legenda técnica" />
          </div>
        ),
        code: `<PhotoPlaceholder label={alt} caption="..." />`,
      },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    title: "Formulário",
    description: "Campos de 48 px, label visível, erro em vermelho associado por aria-describedby.",
    items: [
      {
        name: "Campos",
        preview: (
          <div className="grid max-w-[640px] gap-2 sm:grid-cols-2">
            <Field id="ds-nome" label="Nome completo *">
              <Input id="ds-nome" placeholder="" />
            </Field>
            <Field id="ds-email" label="E-mail *" error="Informe um e-mail válido.">
              <Input id="ds-email" invalid describedBy="ds-email-error" defaultValue="contato@" />
            </Field>
            <Field id="ds-tipo" label="Tipo de demanda *">
              <Select id="ds-tipo" defaultValue="Sinistro">
                <option>Sinistro</option>
                <option>Consultoria</option>
              </Select>
            </Field>
            <Field id="ds-uf" label="UF do evento ou do objeto periciado">
              <Select id="ds-uf" defaultValue="SC">
                <option>SC</option>
              </Select>
            </Field>
            <Field id="ds-desc" label="Descrição da demanda *" className="sm:col-span-2">
              <Textarea id="ds-desc" />
            </Field>
            <Checkbox id="ds-check" className="sm:col-span-2">
              Concordo com o tratamento dos dados.
            </Checkbox>
          </div>
        ),
        code: `<Field id="email" label="E-mail *" error={errors.email?.message}>\n  <Input id="email" invalid={!!errors.email} {...register("email")} />\n</Field>`,
      },
    ],
  },
  {
    id: "ilustracoes",
    label: "Ilustrações",
    title: "Ilustrações técnicas",
    description: "SVG com as regras de gráfico do manual (seção 11). tone=light|dark. Animação pausada até entrar na tela.",
    items: [
      { name: "ReconstructionScene", dark: true, preview: <ReconstructionScene />, code: `<ReconstructionScene tone="dark" />` },
      { name: "EdrChart", preview: <EdrChart />, code: `<EdrChart tone="light" compact={false} />` },
      { name: "MonteCarloChart", preview: <MonteCarloChart />, code: `<MonteCarloChart tone="light" />` },
      { name: "VideoFrames", preview: <VideoFrames />, code: `<VideoFrames tone="light" />` },
      {
        name: "BrazilMap",
        preview: (
          <div className="max-w-[420px]">
            <BrazilMap tone="light" />
          </div>
        ),
        code: `<BrazilMap tone="light" />`,
      },
      { name: "SymbolConstruction", dark: true, preview: <SymbolConstruction />, code: `<SymbolConstruction />` },
      {
        name: "MachineDiagnostics",
        description: "Industrial: trem de acionamento, sensores P1 a P4, vibração e espectro com pico crítico.",
        preview: <MachineDiagnostics />,
        code: `<MachineDiagnostics tone="light" />`,
      },
      {
        name: "TechnicalDrawing",
        description: "Industrial: eixo e engrenagem cotados, detalhe da fratura, carimbo da folha.",
        preview: <TechnicalDrawing />,
        code: `<TechnicalDrawing tone="light" />`,
      },
      {
        name: "FireOriginPlan",
        description: "Planta de galpão com zona de origem e vetores de propagação.",
        preview: <FireOriginPlan />,
        code: `<FireOriginPlan tone="light" />`,
      },
      {
        name: "VehicleInspection",
        description: "Vista superior com os pontos de identificação da perícia cautelar.",
        preview: <VehicleInspection />,
        code: `<VehicleInspection tone="light" />`,
      },
    ],
  },
  {
    id: "movimento",
    label: "Movimento",
    title: "Movimento",
    description:
      "Reveal (fade + 16 px em CSS, cascata), InView (pausa animações CSS até aparecer), Marquee em CSS, zoom suave nas fotos de banner e ViewTransition entre páginas. Tudo respeita prefers-reduced-motion.",
    items: [
      {
        name: "Marquee",
        preview: <Marquee items={["Azul Seguros", "Porto Seguro", "Mapfre Seguros"]} label="Exemplo" itemClassName="px-2 text-xl font-semibold text-ink-soft" />,
        code: `<Marquee items={clients.names} label="Clientes" />`,
      },
      {
        name: "Reveal",
        preview: <p className="text-sm text-muted">Server Component com data-reveal; um único RevealObserver no layout revela por CSS.</p>,
        code: `<Reveal delay={0.08}>\n  <h2>...</h2>\n</Reveal>`,
      },
    ],
  },
];

export default function DesignSystemPage() {
  return <LibraryShell project="Infinity Engenharia e Perícias" version="v1.0.0 · marca v1.3.1" categories={categories} />;
}
