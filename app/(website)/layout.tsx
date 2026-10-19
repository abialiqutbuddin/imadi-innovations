import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Schibsted_Grotesk,
  Source_Sans_3,
} from "next/font/google";
import "../globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const utility = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-utility",
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imadi Innovations | Custom Business Software",
  description: "Custom mobile apps, web apps, desktop software, AI integrations, and automation systems built around your business workflow.",
  keywords: [
    "Software Development",
    "AI Automation",
    "Web Development",
    "Mobile App Development",
    "Custom Software",
    "Remote Team",
    "Pakistan",
    "Digital Transformation",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Abi Ali Qutbuddin", url: "https://imadi-innovations.com" }],
  creator: "Imadi Innovations",
  publisher: "Imadi Innovations",
  metadataBase: new URL("https://imadi-innovations.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Imadi Innovations | Custom Business Software",
    description: "We build practical software for businesses that want to reduce manual work, connect scattered data, and manage operations more clearly.",
    url: "https://imadi-innovations.com",
    siteName: "Imadi Innovations",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imadi Innovations | Custom Business Software",
    description: "Practical mobile apps, web apps, desktop software, AI integrations, and automation systems built around your workflow.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Imadi Innovations",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>
        {children}
      </body>
    </html>
  );
}
