import type { Metadata } from "next";
import { Geist, Geist_Mono ,Inter,} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CapCord - Record, Share, and Collaborate in Seconds",
  description:
    "CapCord makes screen recording effortless. Create quick walkthroughs, presentations, and tutorials. Share instantly with your team or the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
