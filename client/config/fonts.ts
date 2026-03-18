import {
  Changa_One,
  DM_Sans as FontMono,
  Quicksand as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontChangeOne = Changa_One({
  subsets: ["latin"],
  variable: "--font-changeone",
  weight: ["400"],
});
