import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/features/Header";
import Motion from "@/components/features/Motion";
import { Footer } from "@/components/features/Shared";
import { home, indexable, siteUrl } from "@/lib/content";
import "./globals.css";
const work = localFont({
  src: "../../public/fonts/work-sans.woff2",
  variable: "--font-work",
  weight: "100 900",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.title, template: "%s | Linhave" },
  description: home.description,
  robots: { index: indexable, follow: indexable },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "Linhave",
    images: [
      {
        url: "/images/Seglager-53-kopier-scaled.jpg",
        width: 1200,
        height: 690,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="da" className={work.variable}>
      <body>
        <a href="#indhold" className="skip-link">
          Gå til indhold
        </a>
        <Header />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
