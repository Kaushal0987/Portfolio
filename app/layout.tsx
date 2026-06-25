import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DotFieldBackground } from "@/components/ui/DotFieldBackground";
import { site } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.bio,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.bio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <DotFieldBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
