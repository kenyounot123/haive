import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Background from "./background";
import Providers from "./providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haive — Expert AI Chatbots",
  description:
    "Discover the ultimate AI chatbot experience with Haive where expert HiveBots provide instant, specialized insights just for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={outfit.className}>
          <Background>{children}</Background>
        </body>
      </Providers>
    </html>
  );
}
