import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07151f",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bem-vindo-inky.vercel.app"),
  title: "Bem vindo à Igreja Mananciais",
  description: "Saiba mais e conecte-se",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bem vindo à Igreja Mananciais",
    description: "Saiba mais e conecte-se",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bem vindo à Igreja Mananciais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bem vindo à Igreja Mananciais",
    description: "Saiba mais e conecte-se",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Igreja Mananciais",
  foundingDate: "2004",
  address: "[ENDEREÇO DA IGREJA]",
  telephone: "[TELEFONE]",
  sameAs: ["[INSTAGRAM_URL]", "[YOUTUBE_URL]"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
