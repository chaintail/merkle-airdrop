import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = getMetadata({
  title: "Merkle Airdrop",
  description: "Demo Airdrop app using Merkle Proofs for claims verification",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            {children}
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
