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

// Le code SVG de ton vrai logo M avec la flèche, encodé en Data URI (conservé à 100%)
const svgLogo = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <defs>
      <linearGradient id="grad-m" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00ced1"/>
        <stop offset="100%" stop-color="#1e90ff"/>
      </linearGradient>
    </defs>
    <circle cx="250" cy="250" r="250" fill="#07080c"/>
    <path d="M130 380 L130 140 L200 230 L250 160 L300 230 L370 140 L370 380 L315 380 L315 230 L250 310 L185 230 L185 380 Z" fill="url(#grad-m)"/>
    <polygon points="250,90 220,140 280,140" fill="#00ced1"/>
  </svg>
`)}`;

export const metadata: Metadata = {
  title: "AI Mastery",
  description: "Transformez l'Intelligence Artificielle en un véritable levier de revenus",
  icons: {
    icon: svgLogo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-[#0b0b0f] text-white">
        {children}
      </body>
    </html>
  );
}