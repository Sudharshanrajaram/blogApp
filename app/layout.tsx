import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";


const outfit = Outfit({
  subsets: ["latin"],
  weight:["400", "500", "600", "700"],
  variable: "--font-outfit",
});


export const metadata: Metadata = {
  title: "BLOP-APP",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
