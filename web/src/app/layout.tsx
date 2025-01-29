"use client"; // Adicionando "use client" para garantir que o código seja executado no cliente

import "./globals.css";

import { Poppins } from "next/font/google";

import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { TanstackProvider } from "@/provider/tanstack-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <TanstackProvider>{children}</TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
