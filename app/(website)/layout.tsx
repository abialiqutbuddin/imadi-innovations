import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppBackground from "@/components/AppBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
    title: "Imadi Innovations | Custom Business Software",
    description: "Practical mobile apps, web apps, desktop software, AI integrations, and automation systems built around your workflow.",
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
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AppBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
