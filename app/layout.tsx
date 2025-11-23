import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Imadi Innovations | Custom Software & AI Automation",
    template: "%s | Imadi Innovations",
  },
  description: "Imadi Innovations is a Pakistan-based remote team specializing in custom software development, AI automation, and digital transformation for businesses worldwide.",
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
    title: "Imadi Innovations | Custom Software & AI Automation",
    description: "Building custom software and AI automations for modern businesses. We combine strong engineering with deep business understanding.",
    url: "https://imadi-innovations.com",
    siteName: "Imadi Innovations",
    images: [
      {
        url: "/favicon.ico", // Using favicon as placeholder, ideally should be a dedicated OG image
        width: 800,
        height: 600,
        alt: "Imadi Innovations Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imadi Innovations | Custom Software & AI Automation",
    description: "Building custom software and AI automations for modern businesses.",
    images: ["/favicon.ico"], // Using favicon as placeholder
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
