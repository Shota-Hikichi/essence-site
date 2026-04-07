import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Serif_Display, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationProvider from "@/components/AnimationProvider";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Essence",
  icons: { icon: '/icon.svg' },
  description:
    "自分で自分を改善できる考え方と、努力の方向を正す軌道修正を二人三脚で行う、受験生のためのオンラインコーチングサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${cormorantGaramond.variable} ${dmSerifDisplay.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body>
        <AnimationProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
