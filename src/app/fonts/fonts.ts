import { Audiowide, Unkempt } from "next/font/google";

export const unkempt = Unkempt({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unkempt",
});

export const audiowide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-audiowide",
});
