---
name: Infinity Engenharia e Perícias
version: 1.0.0
source: Manual da marca v1.3.1 (setembro de 2026) + web/tokens.css do kit infinity-marca-kit-v1.3
module: 8 # todo espaço, altura de linha e componente em múltiplos de 8
colors:
  canvas: "#FFFFFF"            # branco, fundo principal
  ink: "#1B2430"               # grafite, cor da marca, texto, símbolo
  ink-soft: "#3F4B58"          # grafite claro, texto técnico, cotas
  muted: "#5A636E"             # cinza secundário, texto de apoio (6,10:1 no branco)
  graphic: "#8A9199"           # cinza, SOMENTE elemento gráfico, eixo, ícone. Nunca texto
  silver: "#C7CDD4"            # cinza claro, texto de apoio sobre grafite (9,77:1)
  signature-line: "#CFD5DB"    # filete da assinatura
  border: "#E6E8EB"            # cinza de filete, divisórias, grade de gráfico
  surface-muted: "#F4F5F7"     # neutro, fundo alternado
  highlight: "#FCF6F6"         # fundo de destaque (caixa de destaque)
  primary: "#C8102E"           # vermelho, acento do sistema. Nunca no símbolo
  primary-hover: "#A00D25"     # vermelho escuro, hover e pressionado
  primary-on-dark: "#E24B4A"   # vermelho acessível, só sobre fundo escuro
  surface-dark: "#1B2430"      # grafite, seções escuras
  surface-deep: "#12181F"      # fundo profundo (modo escuro da marca)
  border-dark: "#2C3742"       # filete sobre escuro
  on-dark: "#FFFFFF"           # texto sobre grafite (15,65:1)
  on-dark-muted: "#A8B1BA"     # texto de apoio sobre escuro
typography:
  sans: "IBM Plex Sans 400/500/600"
  mono: "IBM Plex Mono 400"
  scale: # tamanho / entrelinha (px)
    xs: [12, 16]
    sm: [14, 24]
    base: [16, 24]
    lg: [20, 32]
    xl: [24, 32]
    2xl: [32, 40]
    3xl: [40, 48]
    4xl: [48, 56]
    hero: [64, 72]
  label: "IBM Plex Mono 12/16, caixa alta, tracking 0.12em"
rounded:
  sm: 4px    # exceção óptica: etiquetas e chips
  md: 8px    # raio padrão da marca
  lg: 16px   # raio grande (cartões de destaque, selo)
spacing: "1 unidade = 8px (p-1 = 8, p-2 = 16, p-3 = 24, p-4 = 32, p-5 = 40, p-6 = 48, p-8 = 64, p-10 = 80, p-12 = 96, p-16 = 128)"
elevation: "Filetes de 1px em vez de sombra. Única sombra: overlay (menus flutuantes e banner)."
---

# DESIGN.md · Infinity Engenharia e Perícias

Fonte única da verdade visual do site. Tudo que está aqui foi derivado do **Manual da Marca v1.3.1**
e de `web/tokens.css` do kit da marca. Os tokens vivem em `src/app/globals.css` (bloco `@theme`).
**Nunca invente cor, medida ou fonte fora desta lista. As cores default do Tailwind foram desligadas.**

A página interna `/design-system` (noindex) mostra todos os tokens e componentes vivos.

---

## 1. Conceito

> "A marca é um percurso que sai de um ponto, percorre os dois laços, passa pelo cruzamento e fecha
> exatamente no ponto em que começou. É a descrição do trabalho da Infinity: duas trajetórias, um
> ponto de encontro e uma reconstrução que só vale se puder ser verificada."

O site é um **laudo técnico vivo**: rigor de documento pericial, com movimento.

- **Malha técnica.** Grade de 8 px, filetes finos, numeração de seção em IBM Plex Mono vermelha
  (`01`, `02`...), legendas técnicas em caixa alta. A página parece um documento auditável.
- **Dados como imagem.** Em vez de foto de banco, ilustrações técnicas em SVG desenhadas com as
  regras de gráfico do manual (seção 11): série principal em grafite 2 px, séries secundárias em
  grafite claro ou cinza tracejado, vermelho reservado ao ponto de impacto, eixos em cinza
  secundário, grade em cinza de filete, números em Plex Mono.
- **Movimento com propósito.** Trajetórias que se desenham, pontos de impacto que pulsam, seções que
  entram em cascata. Toda animação respeita `prefers-reduced-motion`.

## 2. Cor

| Token | Hex | Papel |
|---|---|---|
| `ink` | #1B2430 | Grafite. Cor da marca, títulos, texto, símbolo |
| `ink-soft` | #3F4B58 | Texto técnico, legendas de dados, séries secundárias |
| `muted` | #5A636E | Texto de apoio sobre branco (6,10:1) |
| `graphic` | #8A9199 | **Só** elemento gráfico, eixo, ícone. **Nunca texto** sobre branco |
| `silver` | #C7CDD4 | Texto de apoio sobre grafite |
| `signature-line` | #CFD5DB | Filete divisor da assinatura |
| `border` | #E6E8EB | Filetes, divisórias, grade de gráfico |
| `surface-muted` | #F4F5F7 | Fundo alternado |
| `highlight` | #FCF6F6 | Caixa de destaque |
| `primary` | #C8102E | Acento: numeração, filete ativo, ponto de interesse, CTA principal |
| `primary-hover` | #A00D25 | Hover e pressionado do vermelho |
| `primary-on-dark` | #E24B4A | Vermelho sobre fundo escuro (só elemento gráfico e texto grande) |
| `surface-dark` | #1B2430 | Seções escuras (hero, CTA final) |
| `surface-deep` | #12181F | Rodapé e fundo profundo |
| `border-dark` | #2C3742 | Filete sobre escuro |
| `on-dark` | #FFFFFF | Texto sobre grafite |
| `on-dark-muted` | #A8B1BA | Texto de apoio sobre escuro |

**Regras não negociáveis**

1. O símbolo **nunca** aparece em vermelho. Vermelho é acento do sistema, não cor da marca.
2. Vermelho ocupa **no máximo 10%** da área de qualquer tela. Grafite e branco ocupam a maior parte.
3. `#C8102E` sobre grafite é proibido para texto e filetes (2,66:1); nesses casos use `primary-on-dark` (#E24B4A).
   **Exceção aprovada pela agência (24/10/2026): o botão CTA principal é sempre vermelho `primary` em todas as
   seções, inclusive sobre grafite e foto**, porque destaca mais do que o branco. O texto do botão é branco (5,88:1).
4. `graphic` (#8A9199) nunca é cor de texto sobre branco. Texto de apoio é `muted` (#5A636E).
5. Nada de degradê, sombra, reflexo ou volume em marca, gráficos e ilustrações.

## 3. Tipografia

- **IBM Plex Sans** (400, 500, 600): nome, títulos, texto corrido.
- **IBM Plex Mono** (400): rótulos (eyebrow), numeração, legendas técnicas, dados.
- Carregadas via `next/font/google` (self-hosted no build, `display: swap`, zero CLS).

| Token | Tamanho / linha | Uso |
|---|---|---|
| `text-hero` | 64 / 72 | H1 de hero no desktop |
| `text-4xl` | 48 / 56 | H1 de hero no tablet, títulos de impacto |
| `text-3xl` | 40 / 48 | Título de página (manual: 40/48) |
| `text-2xl` | 32 / 40 | H2 de seção no desktop |
| `text-xl` | 24 / 32 | Título de seção (manual: 24/32), H3 de cartão |
| `text-lg` | 20 / 32 | Lead/tagline |
| `text-base` | 16 / 24 | Texto |
| `text-sm` | 14 / 24 | Apoio |
| `text-xs` | 12 / 16 | Legenda técnica |
| `text-label` | 12 / 16 mono, caixa alta, tracking 0.12em | Eyebrow, rótulos, numeração |

Títulos em peso 600 com tracking levemente negativo. Linha de texto entre 55 e 75 caracteres
(`max-w-prose` = 72ch).

## 4. Espaço, grade e forma

- **Unidade de spacing = 8 px.** No Tailwind deste projeto `p-1` = 8 px, `gap-3` = 24 px, `mt-12` = 96 px.
  Use `0.5` (4 px) só para ajuste óptico.
- Escala: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128.
- Grade de página: 12 colunas, goteira de 24 (`gap-3`), margem lateral 16 no mobile (`px-2`) e 32 no
  desktop (`px-4`). Largura máxima do conteúdo: 1280 px (`max-w-site`).
- Ritmo vertical de seção: 80 px mobile (`py-10`), 128 px desktop (`py-16`).
- Altura de controle (botão, campo): **48 px** (`h-6`). Botão pequeno: 40 px (`h-5`).
- Raio: `rounded-md` 8 px (padrão), `rounded-lg` 16 px (cartão de destaque), `rounded-sm` 4 px (etiqueta).
- Elevação: **filete de 1 px** (`border-border`). Sombra só em overlay (`shadow-overlay`).

## 5. Marca no site

Componente `<Logo />` em `src/components/ui/logo.jsx`, desenhado com o **path oficial** do símbolo
(contorno 136 × 56, traço de 8) e as posições exatas dos SVGs do kit. Texto em IBM Plex Sans 600,
linha de baixo em IBM Plex Mono com tracking 0.286em.

| Versão | Quando usar no site | Mínimo |
|---|---|---|
| `horizontal` | Cabeçalho desktop (altura 40 px) e rodapé | 280 px de largura |
| `reduzida` | Cabeçalho mobile e menu | 96 px |
| `simbolo` | Favicon, marcas d'água, detalhes gráficos | 24 px |
| `selo` | Avatar, og:image, placa sobre foto complexa | 32 px |

- Fundo claro → grafite. Fundo grafite → branca (`tone="light"`). Nunca sobre vermelho.
- Área de proteção de 1 módulo em volta do contorno. Sem rotação, distorção, sombra ou efeito.

## 6. Componentes

Todos em `src/components/ui/`, export nomeado, Server Component por padrão, classes com `cn()`.

| Componente | Variantes / notas |
|---|---|
| `Button` | **CTA = `primary` (vermelho) em qualquer fundo.** Secundário ao lado de um CTA: `outline` (claro) ou `outline-light` (escuro). `secondary`, `ghost` e `light` existem só para casos internos. Tamanhos `md` (48) e `sm` (40) de altura mínima; abaixo de 640 px o texto quebra linha em vez de estourar a tela. Seta desliza no hover. `href` interno renderiza `next/link`. |
| `ArrowLink` | Link textual "Saiba mais →" com seta animada e sublinhado vermelho. |
| `TextLink` | Link de navegação: borda inferior 2 px `primary` no hover e no estado ativo. |
| `Eyebrow` | Plex Mono caixa alta, número de seção em vermelho + traço + rótulo. `tone="dark"` usa `primary-on-dark`. |
| `SectionHeading` | Eyebrow + H2 + lead, alinhamento `left`/`center`, tom claro/escuro. |
| `Card` | Fundo branco, filete 1 px, raio 8. No hover: filete superior vermelho cresce da esquerda, borda escurece. |
| `BulletList` | Lista técnica com marcador em traço vermelho ou numeração mono. |
| `Tag` | Etiqueta mono 12 px, raio 4. |
| `Logo` | Ver seção 5. |
| `Reveal` | (server) Marca o bloco com `data-reveal`; um único `RevealObserver` (client, no layout) revela com transição CSS de fade + 16 px. `delay` para cascata. |
| `MegaMenu` | Painel de largura total sob o header: chamada + CTA (3 col), links com ícone e descrição da copy (5 a 6 col), foto (3 a 4 col). Abre no hover com intenção, clique ou seta para baixo; fecha com Esc, clique fora ou saída do mouse. Header fica sólido enquanto aberto. |
| `HeroBackdrop` | Foto de fundo do banner com `next/image` (`preload`), véu grafite à esquerda para legibilidade e malha técnica. Todas as páginas internas usam foto no banner (Contato inclusive). |
| `Marquee` | Faixa infinita em CSS puro, pausa no hover/foco, estática em reduced-motion. |
| `Field`, `Input`, `Select`, `Textarea`, `Checkbox` | Altura 48, filete 1 px, foco com anel vermelho 2 px, erro em `primary`. |
| `CookieBanner` | (client) Fundo `surface-dark`, fixo embaixo. Vem no HTML estático (some antes da pintura para quem já escolheu, via `html[data-consent]`); ao reabrir pelas preferências, desliza de baixo. Ações: Preferências, Somente necessários, Aceitar Todos. |
| `WhatsAppButton` | CTA com o ícone oficial do WhatsApp (`WhatsAppIcon`, path do Simple Icons, CC0). Número vem de `src/data/site.js`; sem número, leva ao formulário. |
| `Breadcrumbs` | Trilha mono acima do H1 das páginas internas, com JSON-LD. |

### Estados de interação

- **Foco:** `outline` 2 px `primary` com offset 2 (sobre escuro: `primary-on-dark`). Nunca remover.
- **Hover de link:** sublinhado vermelho 2 px que cresce da esquerda.
- **Hover de botão primário:** `primary` → `primary-hover`; seta avança 4 px.
- **Ativo de navegação:** borda inferior `primary`.

## 7. Movimento

| Token | Valor | Uso |
|---|---|---|
| `ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) | Entradas e hovers |
| Duração curta | 200 ms | Hover, cor, sublinhado |
| Duração média | 600 ms | Reveal de bloco |
| Duração longa | 1200 a 2400 ms | Desenho de trajetória, gráficos |
| Cascata | 80 a 120 ms entre itens | `Reveal delay` |

- Entradas: fade + 16 px de subida. Nunca bloco único: cascata elemento por elemento.
- Hero anima com CSS puro (não espera hidratação; protege o LCP).
- **Loader de entrada** (`SiteLoader`, só em carga completa da página): fundo grafite com malha; o símbolo é desenhado
  como um percurso (traço branco, 0,9 s), o divisor cresce, "Infinity" e "ENGENHARIA E PERÍCIAS" entram, a barra de
  progresso vermelha (`primary-on-dark`) completa; a tela sobe (800 ms) quando a página termina de carregar, com
  mínimo de 1,2 s e máximo de 4 s. Enquanto ativo, as animações do hero ficam pausadas e começam na revelação.
  Sem JavaScript o loader não aparece; com movimento reduzido, só um fade curto. Navegação interna não repete o
  loader (usa a cortina de transição abaixo).
- **Cortina entre páginas** (`RouteTransition`, a cada clique em link interno para outra página): painel grafite com
  malha e filete vermelho no topo sobe de baixo (450 ms), o símbolo se desenha em branco e a barra vermelha avança;
  a navegação acontece por trás e, quando a nova rota monta, a cortina continua subindo e libera a página (650 ms,
  `ease-out-expo`). Âncoras na mesma página, links externos, nova aba, teclas modificadoras e voltar/avançar do
  navegador não usam a cortina. Com movimento reduzido, navegação direta. Limite de segurança de 4 s.
- Ilustrações: traços se desenham (`stroke-dashoffset`), ponto de impacto pulsa em `primary-on-dark`.
- `prefers-reduced-motion: reduce` → tudo aparece no estado final, sem deslocamento, marquee parado.

## 8. Ilustrações técnicas (regra de gráfico do manual, seção 11)

| Ilustração | Onde | Tema |
|---|---|---|
| `MachineDiagnostics` | Home (forense), Perícias Industriais, Avaliação de Máquinas | Trem de acionamento, sensores, vibração e espectro |
| `TechnicalDrawing` | Projetos, Assistência Judicial, Treinamentos | Eixo e engrenagem cotados, detalhe da fratura |
| `FireOriginPlan` | Incêndios | Planta de galpão, zona de origem, propagação |
| `VehicleInspection` | Cautelares | Pontos de identificação do veículo |
| `ReconstructionScene` | Reconstrução, Tecnologia, card Virtual CRASH | Croqui com fases do acidente |
| `EdrChart`, `MonteCarloChart` | Tecnologia, cards da Home | Dados de colisão e incerteza |
| `SymbolConstruction` | Sobre (seção 2) | Construção geométrica do símbolo |
| `BrazilMap` | Home, Contato | Sede e cobertura nacional |

- Série principal: grafite (ou branco sobre escuro), traço 2 px.
- Séries secundárias: grafite claro ou cinza, diferenciadas também por tracejado, nunca só pela cor.
- Vermelho reservado: ponto de impacto, limite, evento crítico. Um destaque por gráfico.
- Eixos e marcas em cinza secundário; grade em cinza de filete; números e rótulos em Plex Mono.
- Monte Carlo: histograma em grafite claro, P50 em grafite, faixa P5 a P95 em neutro.
- Sem efeito 3D, sombra, degradê ou fundo colorido.

## 9. Fotografia

- Fotografia técnica é evidência: sem filtro, sem correção seletiva, sem IA generativa.
- Institucional: pessoas trabalhando de verdade, luz real, tons naturais. **Sem banco de imagem.**
- **Imagens provisórias:** banners e cards usam imagens provisórias em paleta grafite, sem logos nem texto. Substituir
  por fotos reais da Infinity assim que existirem (mesmo caminho em `public/images/`).
- **Tema por contexto:** imagem com veículo **só** onde o conteúdo fala de acidente de trânsito, automotivo ou veículo
  (reconstrução, cautelar, tecnologias CDR/Virtual CRASH/eCrash). Em todo o resto, cenário **industrial** (fábrica,
  máquinas, engenharia mecânica), que é o foco comercial do cliente.
- **Equilíbrio foto + ilustração:** cada página combina fotografia (banner, cards) com pelo menos uma ilustração técnica
  animada (seção forense, corpo dos serviços, gráficos sobre a foto nos cards de tecnologia, mapa, construção do símbolo).
- Banners: foto em `object-cover` com véu grafite (`rgb(27 36 48)` de 96% a 20%) do lado do texto. O véu é recurso
  de legibilidade sobre fotografia, não degradê de marca.
- A foto do Eng. Emerson aguarda um retrato real (hoje `PhotoPlaceholder`).

## 10. Acessibilidade (meta WCAG 2.2 AA)

- Contraste mínimo 4,5:1 para texto, 3:1 para texto grande e elementos de interface.
- Um único H1 por página, hierarquia de títulos sem saltos.
- Link "Pular para o conteúdo", landmarks (`header`, `nav`, `main`, `footer`), `aria-current` na navegação.
- Alvos de toque com no mínimo 48 × 48 px.
- Formulário com `label` visível, erros associados por `aria-describedby` e anunciados.
- Ícones decorativos com `aria-hidden`; ícones de serviço com o alt text aprovado na copy.
