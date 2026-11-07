import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import FloatingBooking from "@/components/floating-booking";
import ChatWidget from "@/components/chat-widget";
import { HOME_IMAGE } from "@/lib/site-data";
import "./globals.css";
import "./homepage.css";
import "./addons.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.accesspsych.com.au"),
  title: {
    default: "Access Psych | Mental health support across Australia",
    template: "%s | Access Psych",
  },
  description:
    "Access Psych provides psychology, therapy and counselling services via telehealth and at selected clinics across Australia.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Access Psych",
    title: "Access Psych | Mental health support across Australia",
    description:
      "Qualified mental health clinicians offering telehealth and face-to-face psychology, therapy and counselling services.",
    images: [HOME_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Access Psych | Mental health support across Australia",
    images: [HOME_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingBooking />
        <ChatWidget />
      </body>
    </html>
  );
}
