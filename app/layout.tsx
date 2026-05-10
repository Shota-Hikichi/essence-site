import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

const SITE_URL = "https://www.essence-coaching.net";
const SITE_NAME = "Essence";
const DEFAULT_TITLE = "Essence｜大学受験オンラインコーチング（第一志望合格率76%）";
const DEFAULT_DESCRIPTION =
  "「努力の方向」さえ合えば、結果は変わる。志望校と現在地の差を数値で可視化し、残された月・週・日から逆算して『今日やるべきこと』まで設計する大学受験オンラインコーチング。第一志望合格率76%、早稲田・慶應・京都大学など難関大へ続々合格。超少人数制、コンサル思考で徹底伴走。";

export const viewport: Viewport = {
  themeColor: "#9A071A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Essence",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "大学受験",
    "オンラインコーチング",
    "受験コーチング",
    "志望校合格",
    "逆算思考",
    "学習計画",
    "学習管理",
    "早稲田大学",
    "慶應義塾大学",
    "京都大学",
    "MARCH",
    "受験勉強",
    "予備校",
    "塾",
    "引地祥太",
    "Essence",
  ],
  authors: [{ name: "引地 祥太", url: SITE_URL }],
  creator: "Essence",
  publisher: "Essence",
  icons: { icon: "/icon.svg" },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: "@hikky0834",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "education",
  verification: {
    google: "JjyC40mMqL1UZcCKOkaQRG9Toyld9XfSgTK_plEz_qc",
  },
};

// JSON-LD: Organization / EducationalOrganization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "Essence",
  alternateName: "エッセンス",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2019-11",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "引地 祥太",
    alternateName: "Shota Hikichi",
    jobTitle: "代表",
    url: SITE_URL,
    sameAs: ["https://www.youtube.com/@hikky0834"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "早稲田大学 社会科学部",
    },
  },
  areaServed: { "@type": "Country", name: "Japan" },
  sameAs: ["https://www.youtube.com/@hikky0834"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["Japanese"],
    url: `${SITE_URL}/#cta`,
  },
};

// JSON-LD: WebSite (with potential SearchAction)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "ja-JP",
  publisher: { "@id": `${SITE_URL}/#organization` },
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
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0BWBYWFVT5" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0BWBYWFVT5');
        `}</Script>
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <AnimationProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
