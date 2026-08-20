import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { IntroLoader } from "@/components/cinema/IntroLoader";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

/**
 * Display face: Fraunces at large optical sizes — editorial, warm, nothing
 * like a construction template. Used ONLY for display headings; navigation,
 * labels and body stay on Inter for legibility. (Oswald retired with the
 * typographic logo — the official mark is now a supplied image.)
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // Variable font: weight axis stays variable so the optical-size axis can be
  // declared alongside it (Turbopack rejects axes + fixed weights).
  weight: "variable",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brandName} · Commercial concrete placement and finishing, Sydney`,
    template: `%s · ${site.brandName}`,
  },
  description: site.descriptor,
  openGraph: {
    siteName: site.brandName,
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <IntroLoader />
        {/* Stamp JS availability before paint so reveal-hidden styles never
            apply in no-JS environments (content stays visible). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-js','1')",
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
