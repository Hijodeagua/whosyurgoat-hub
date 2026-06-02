import type { Metadata } from "next";
import { Press_Start_2P, Chakra_Petch } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const body = Chakra_Petch({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tre's Arcade — Project Hub",
  description: "A directory of Tre's projects, all under one roof.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pixel.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
