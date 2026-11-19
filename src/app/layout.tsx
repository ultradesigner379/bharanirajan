import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S. Bharani Rajan — Ultra Designer | 3D Animator, Graphic Designer & AI Enthusiast",
  description:
    "Portfolio of S. Bharani Rajan (Ultra Designer / UD): 3D animation, graphic design, UI/UX, brand identity, and Generative AI-powered web development.",
  keywords: [
    "Ultra Designer",
    "UD",
    "Bharani Rajan",
    "3D Animator",
    "Graphic Designer",
    "AI Enthusiast",
    "Blender",
 "Maya",
    "Figma",
    "Generative AI",
    "Portfolio",
  ],
  authors: [{ name: "S. Bharani Rajan" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "S. Bharani Rajan — Ultra Designer",
    description:
      "3D Animator, Graphic Designer & AI Enthusiast. Bridging visual storytelling and modern technology.",
    url: "https://chat.z.ai",
    siteName: "Ultra Designer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S. Bharani Rajan — Ultra Designer",
    description:
      "3D Animator, Graphic Designer & AI Enthusiast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
