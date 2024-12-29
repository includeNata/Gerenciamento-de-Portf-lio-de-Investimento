"use client"; // Adicionando "use client" para garantir que o código seja executado no cliente

import "./globals.css";

import { Roboto } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { TanstackProvider } from "@/provider/tanstack-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "500", "700", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
