import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/content/site-config";
import { localBusinessSchema } from "@/lib/schema";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Łap Chwile. Urodziny i zabawa nad Zalewem Zegrzyńskim",
    template: "%s | Łap Chwile",
  },
  description:
    "Strefa zabaw przy Porcie Pilawa w Nieporęcie: Tor Ninja, ogród sensoryczny, warsztaty kreatywne i urodziny z animatorami.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${bricolage.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-action focus:px-5 focus:py-2.5 focus:text-white"
        >
          Przejdź do treści
        </a>
        <Nav />
        <main id="tresc">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
