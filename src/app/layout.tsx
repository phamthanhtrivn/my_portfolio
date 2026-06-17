import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoFont = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phamthanhtri.dev"),
  title: {
    default: "Pham Thanh Tri - Backend / Full-Stack Developer",
    template: "%s | Pham Thanh Tri",
  },
  description:
    "Backend and full-stack developer portfolio for Pham Thanh Tri, featuring product-grade systems with Spring Boot, NestJS, React, Next.js, realtime workflows, databases, Docker, and CI/CD.",
  keywords: [
    "Pham Thanh Tri",
    "Backend Developer",
    "Full-Stack Developer",
    "Spring Boot",
    "NestJS",
    "React",
    "Next.js",
    "TypeScript",
    "Docker",
  ],
  authors: [{ name: "Pham Thanh Tri", url: "https://github.com/phamthanhtrivn" }],
  creator: "Pham Thanh Tri",
  openGraph: {
    title: "Pham Thanh Tri - Backend / Full-Stack Developer",
    description:
      "Product-focused backend and full-stack portfolio covering microservices, realtime systems, payments, databases, Docker, CI/CD, web, and mobile.",
    url: "https://phamthanhtri.dev",
    siteName: "Pham Thanh Tri Portfolio",
    images: [
      {
        url: "https://github.com/phamthanhtrivn.png",
        width: 460,
        height: 460,
        alt: "Pham Thanh Tri GitHub avatar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pham Thanh Tri - Backend / Full-Stack Developer",
    description:
      "Backend and full-stack portfolio featuring Spring Boot, NestJS, React, Next.js, realtime systems, databases, and deployment pipelines.",
    images: ["https://github.com/phamthanhtrivn.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
