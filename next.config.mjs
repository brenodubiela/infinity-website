const isDev = process.env.NODE_ENV === "development";

// CSP estática: o site é pré-renderizado, então nonce não é viável e os scripts inline do Next
// (payload RSC) exigem 'unsafe-inline'. Mesmo assim bloqueia scripts externos, iframes,
// <base> injetado, envio de formulário para outro domínio e o site dentro de iframe alheio.
// Não adicionar hash em script-src: com hash presente o navegador ignora 'unsafe-inline' e o site quebra.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "manifest-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Sem preload até o domínio (com e sem www) estar confirmado na Vercel.
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/design-system/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/atuacao", destination: "/contato#atuacao", permanent: true },
      { source: "/apresentacao", destination: "/sobre", permanent: true },
      { source: "/trabalhe-conosco", destination: "/contato", permanent: true },
      // Endereços de serviço do site antigo (/servicos?url=...).
      ...[
        ["treinamentos", "treinamentos-tecnicos"],
        ["pericias-em-acidentes", "reconstrucao-acidentes-transito"],
        ["pericias-de-incendios", "pericia-investigacao-incendios"],
      ].map(([oldSlug, slug]) => ({
        source: "/servicos",
        has: [{ type: "query", key: "url", value: oldSlug }],
        destination: `/servicos/${slug}`,
        permanent: true,
      })),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
