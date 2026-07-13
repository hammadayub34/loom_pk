import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, DM_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/content";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// 1200x630 (1.91:1), the ratio every link preview crops to. The square 1080
// source tile used to be served here and got letterboxed, and it was doing duty
// as the favicon besides: 139 KB fetched to paint a 16px square. The tab icon is
// now the `icon.png` / `apple-icon.png` file convention, sized for the job.
const SHARE_CARD = {
  url: "/brand/og.png",
  width: 1200,
  height: 630,
  alt: "The LOOM wordmark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LOOM · Where every brand becomes stronger",
    template: "%s · LOOM",
  },
  description:
    "LOOM is a marketing agency in Gujranwala that weaves strategy, story, design, events and reach into one fabric. Digital, events, PR, web and print.",
  keywords: [
    "marketing agency Gujranwala",
    "digital marketing Pakistan",
    "social media management",
    "PR agency",
    "event marketing",
    "web development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "LOOM · Where every brand becomes stronger",
    description:
      "Digital · Events · PR · Web · Print. One strategy, woven consistently across every channel.",
    url: SITE_URL,
    siteName: "LOOM",
    images: [SHARE_CARD],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOOM · Where every brand becomes stronger",
    description: "Digital · Events · PR · Web · Print.",
    images: [SHARE_CARD],
  },
};

export const viewport: Viewport = {
  themeColor: "#2C1053",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  );
}
