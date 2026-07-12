import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSF Jadavpur - Academic Integrity & Heritage",
  description: "Official portal of Nationalist Students' Front, Jadavpur University. Committed to academic integrity, anti-ragging security, and swadeshi heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-chalk text-brand-dark">
        <AppStateProvider>
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
