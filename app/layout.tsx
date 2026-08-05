import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Le code SVG du logo est encodé directement ici en Data URI
const svgLogo = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 2l10 5.8v11.6L16 25.2 6 19.4V7.8L16 2z" fill="%236366f1"/><path d="M16 12v8" stroke="%23ffffff" stroke-width="2.5" stroke-linecap="round"/><path d="M12 16h8" stroke="%23ffffff" stroke-width="2.5" stroke-linecap="round"/></svg>`;

export const metadata: Metadata = {
  title: "AI Mastery",
  description: "Transformez l'Intelligence Artificielle en un véritable levier de revenus",
  icons: {
    icon: svgLogo, // <-- Le logo SVG est maintenant directement intégré dans le code !
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0b0b0f] text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}