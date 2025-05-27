import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shroud Evidence",
  description:
    "Webapp per la raccolta, l'analisi e la documentazione delle prove relative alla Sacra Sindone.",
  keywords: [
    "Sacra Sindone",
    "Sindone di Torino",
    "prove",
    "ricerca",
    "analisi",
    "evidenze",
    "Shroud",
    "Shroud of Turin",
  ],
  authors: [
    { name: "Il team Shroud Evidence", url: "https://jesussearch.vercel.app/" },
  ],
  creator: "Shroud Evidence Team",
  openGraph: {
    title: "Shroud Evidence – Analisi e prove sulla Sacra Sindone",
    description:
      "Una piattaforma per raccogliere e studiare tutte le evidenze legate alla Sacra Sindone.",
    url: "https://jesussearch.vercel.app/",
    siteName: "Shroud Evidence",
    images: [
      {
        url: "https://jesussearch.vercel.app//og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shroud Evidence – Webapp sulla Sindone di Torino",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shroud Evidence",
    description:
      "Webapp per la raccolta e lo studio delle prove sulla Sacra Sindone.",
    images: ["https://jesussearch.vercel.app//og-image.jpg"],
    creator: "@tuo_handle_twitter",
  },
  metadataBase: new URL("https://jesussearch.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
