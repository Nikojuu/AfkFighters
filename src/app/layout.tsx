import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { audiowide, unkempt } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "AFK Fighers",
  description: "when you're too lazy to fight yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${audiowide.variable} ${unkempt.variable} selection:text-black selection:bg-pink-600`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {children}
          </ThemeProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
