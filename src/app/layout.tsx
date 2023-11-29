import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/plate-ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Al-Sira - Arabic Resume optimized for ATS",
  description:
    "Al-Sira is an Arabic Resume optimized for ATS using language models and NLP",
};
// the syntax f({x}): {x: string} is called a type annotation. just like haskell. x must have type string
// in our case, the function RootLayout takes an object with a key children, which is a ReactNode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TooltipProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </Providers>
      </TooltipProvider>
    </ClerkProvider>
  );
}
