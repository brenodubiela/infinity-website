import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { MotionProvider } from "@/components/ui/motion-provider";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { SiteLoader } from "@/components/layout/site-loader";
import { RouteTransition } from "@/components/layout/route-transition";
import { consentScript } from "@/lib/consent";
import { Suspense } from "react";
import { companyData } from "@/data/legal-texts";
import { seo, siteName } from "@/data/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-plex-mono",
});

export const ensureStatic = "navigation";

export const metadata = {
  metadataBase: new URL(companyData.url),
  title: {
    default: seo.home.title,
    template: `%s | ${siteName}`,
  },
  description: seo.home.description,
  applicationName: siteName,
  authors: [{ name: siteName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    title: seo.home.title,
    description: seo.home.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#1B2430",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${companyData.url}/#organizacao`,
  name: companyData.nomeFantasia,
  legalName: companyData.razaoSocial,
  url: companyData.url,
  email: companyData.emailContato,
  telephone: companyData.telefone,
  taxID: companyData.cnpj,
  logo: `${companyData.url}/brand/infinity-selo.svg`,
  description: seo.home.description,
  areaServed: { "@type": "Country", name: "Brasil" },
  address: {
    "@type": "PostalAddress",
    streetAddress: companyData.logradouro,
    postalCode: companyData.cep,
    addressLocality: companyData.cidade,
    addressRegion: companyData.uf,
    addressCountry: "BR",
  },
  founder: { "@type": "Person", name: companyData.responsavelTecnico, jobTitle: companyData.cargoResponsavel },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${companyData.url}/#site`,
  name: siteName,
  url: companyData.url,
  inLanguage: "pt-BR",
  publisher: { "@id": `${companyData.url}/#organizacao` },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh" suppressHydrationWarning>
        <SiteLoader />
        <script dangerouslySetInnerHTML={{ __html: consentScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-inview]{--play:running!important}.site-loader,.cookie-banner{display:none!important}`}</style>
        </noscript>
        <a
          href="#conteudo"
          className="fixed top-1 left-1 z-[60] -translate-y-[200%] rounded-md bg-primary px-2 py-1 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <JsonLd data={organization} />
        <JsonLd data={website} />
        <MotionProvider>
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <RevealObserver />
          <Suspense fallback={null}>
            <RouteTransition />
          </Suspense>
        </MotionProvider>
      </body>
    </html>
  );
}
