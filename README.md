# Infinity Engenharia e Perícias · site institucional

## Convenções do projeto

1. **Leia o `DESIGN.md` antes de criar ou editar qualquer componente.** Ele é a fonte da verdade de cores,
   tipografia, espaço, raio, elevação e componentes, derivado do Manual da Marca v1.3.1.
2. **Server-first.** Componentes são Server Components por padrão. `"use client"` apenas em folhas interativas
   (estado, efeito, evento, `motion`). Nunca em `page.jsx` ou `layout.jsx`. Texto nunca renderizado só no cliente.
3. **Navegação e mídia.** `next/link` para rotas internas, `next/image` para toda imagem (`preload` no LCP),
   `next/font` para toda fonte.
4. **SEO.** Toda página exporta `metadata` ou `generateMetadata` usando `pageMetadata()` de `src/lib/metadata.js`.
5. **Reuso.** Mapeie `src/components/ui/` e o helper `cn()` antes de criar algo. Primitivo novo vai para `ui/` e
   entra na biblioteca `/design-system` antes de ser usado.
6. **Tokens.** Use só os tokens do `@theme` (paleta, tipografia, filetes, spacing, raio). As cores default do Tailwind
   estão desligadas. 1 unidade de spacing = 8 px. Respeite a elevação por filetes e nunca remova o anel de foco.
7. **Copy.** Os textos em `src/data/` são a copy aprovada pelo cliente. Não reescreva.
8. **Estático.** O layout raiz exporta `ensureStatic = "navigation"`: nada de `new Date()`, `Math.random()`,
   `cookies()` ou `headers()` no render.

## Sobre o projeto

Site institucional da Infinity Engenharia e Perícias (Pomerode, SC): perícias técnicas, laudos de engenharia e
assistência técnica judicial em engenharia mecânica. Domínio final: https://www.infinity.eng.br

Páginas: Home, Sobre, Serviços (visão geral + 8 páginas de serviço), Tecnologia, Contato (com a seção de atuação),
Política de Privacidade, 404 e a biblioteca interna `/design-system` (noindex).

Redirecionamentos permanentes (`next.config.mjs`): `/atuacao` → `/contato#atuacao`, e as URLs do site antigo
`/apresentacao` → `/sobre`, `/trabalhe-conosco` → `/contato` e `/servicos?url=...` → página do serviço.

Imagens: `public/images/` (banners e cards). Para trocar uma imagem, substitua o arquivo mantendo o mesmo nome.
Veículo só em contexto de trânsito/automotivo; no resto, cenário industrial.

## Tecnologias

| Pacote | Versão | Uso |
|---|---|---|
| next | 16.4.3 | App Router, Turbopack, Cache Components, Partial Prefetching |
| react / react-dom | 19.3 | UI, `ViewTransition` entre páginas |
| tailwindcss + @tailwindcss/turbopack | 4.3 | CSS-first com tokens no `@theme` |
| motion | 14.6 | Reveal em cascata, menu, linha do tempo |
| lucide-react | 1.61 | Ícones |
| clsx + tailwind-merge | 2.1 / 3.7 | Helper `cn()` |
| react-hook-form | 7.91 | Formulário de contato |
| @svg-maps/brazil | 2.0 | Contorno dos estados no mapa de atuação |
| @fontsource/ibm-plex-sans e -mono (dev) | 5.3 | Fontes da imagem de compartilhamento (og:image) |
| eslint + eslint-config-next | 9 / 16.4.3 | Lint (flat config) |

## Estrutura de pastas

```
/ (raiz)
├── DESIGN.md            design system (fonte da verdade)
├── README.md
├── public/
│   ├── brand/           SVGs oficiais do kit da marca v1.3
│   ├── clients/         logos dos clientes (carrossel da Home)
│   └── images/          banners e cards (home/, sobre/, servicos/, tecnologia/, contato/)
├── src/
│   ├── app/             rotas (pasta = rota), layout raiz, globals.css, sitemap, robots, og:image, ícones
│   │   ├── (legal)/     route group das páginas legais
│   │   ├── api/contato/ Route Handler do formulário
│   │   └── design-system/
│   ├── components/
│   │   ├── layout/      Header, Footer, Container, menus
│   │   ├── sections/    blocos de página
│   │   ├── ui/          primitivos (Button, Eyebrow, Card, Field, Reveal, Logo...)
│   │   ├── illustrations/ ilustrações técnicas em SVG
│   │   └── design-system/ shell da biblioteca interna
│   ├── data/            copy aprovada e dados da empresa
│   ├── lib/             helpers (metadata, consentimento de cookies)
│   └── utils/           cn.js
├── next.config.mjs
├── eslint.config.mjs
└── jsconfig.json
```

## Como executar

```bash
npm install
cp .env.example .env.local   # preencha N8N_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm run start
npm run lint
```

Sem `N8N_WEBHOOK_URL`, o formulário funciona em desenvolvimento em modo simulado (o payload aparece no terminal).
Em produção, sem a variável, a API responde 503.

## Integração do formulário (n8n → Kommo)

`POST /api/contato` aceita só JSON enviado pelo próprio site, valida e higieniza os dados no servidor, descarta
envios com o honeypot preenchido, aplica limite por IP e encaminha para `N8N_WEBHOOK_URL` (com o cabeçalho
`X-Webhook-Secret` quando `N8N_WEBHOOK_SECRET` existe).
O payload leva os campos do formulário, o caminho da página de origem, o consentimento LGPD, a origem
(`site-infinity`) e a data de envio.

## Deploy

Vercel com **Root Directory = `.`** (o app está na raiz).

- Variáveis (só no ambiente **Production**, para previews não criarem leads reais): `N8N_WEBHOOK_URL`,
  `N8N_WEBHOOK_SECRET` (mesmo valor do Header Auth no nó Webhook do n8n).
- Domínio canônico: `https://www.infinity.eng.br` (`companyData.url`). Cadastre `infinity.eng.br` redirecionando
  para o `www`.
- Recomendado: regra de rate limit do Vercel Firewall em `/api/contato` (o limite do código vale por instância).
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options etc.) ficam em `next.config.mjs` → `headers()`.
- Depois de publicar: enviar `https://www.infinity.eng.br/sitemap.xml` no Google Search Console.
