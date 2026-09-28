import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — Full-Stack Developer & Computer Science Engineer`,
    template: `%s | ${DATA.name}`,
  },
  description: `${DATA.name} is a Computer Science undergraduate and software engineer building full-stack applications, backend systems, developer tools, and practical software products.`,
  keywords: [
    "Ashitosh Lavhate",
    "Full-Stack Developer",
    "Software Engineer",
    "Computer Science Engineer",
    "Next.js Developer",
    "Backend Developer",
    "React Developer",
    "TypeScript",
    "Pune Developer",
    "Portfolio",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  applicationName: `${DATA.name} Portfolio`,
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name} — Full-Stack Developer & Computer Science Engineer`,
    description: `${DATA.name} is a Computer Science undergraduate and software engineer building full-stack applications, backend systems, developer tools, and practical software products.`,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Full-Stack Developer & Computer Science Engineer`,
      },
    ],
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
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} — Full-Stack Developer & Computer Science Engineer`,
    description: `${DATA.name} is a Computer Science undergraduate and software engineer building full-stack applications, backend systems, developer tools, and practical software products.`,
    images: [`${DATA.url}/opengraph-image`],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: DATA.name,
  },
  verification: {
    google: "4e244e8becd0e9c7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const knowsAbout = DATA.skills.flatMap((group) =>
    group.skills.map((s) => s.name)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${DATA.url}/#website`,
        name: `${DATA.name} — Portfolio`,
        url: DATA.url,
        description: DATA.description,
        publisher: {
          "@id": `${DATA.url}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${DATA.url}/#person`,
        name: DATA.name,
        url: DATA.url,
        image: `${DATA.url}${DATA.avatarUrl}`,
        jobTitle: "Software Engineer",
        description: DATA.description,
        email: `mailto:${DATA.contact.email}`,
        telephone: DATA.contact.tel,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "India",
        },
        alumniOf: DATA.education.map((edu) => ({
          "@type": "EducationalOrganization",
          name: edu.school,
          ...(edu.href ? { url: edu.href } : {}),
        })),
        sameAs: [
          DATA.contact.social.GitHub.url,
          DATA.contact.social.LinkedIn.url,
        ],
        knowsAbout: [
          "Computer Science",
          "Software Engineering",
          "Full-Stack Development",
          ...knowsAbout,
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
