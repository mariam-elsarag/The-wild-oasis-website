import React from "react";

// --fonts
import { Josefin_Sans, Inter } from "next/font/google";
// styles
import "@/app/_assets/styles/global.css";
import Header from "./_components/layout/Header";
import Providers from "./_context/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  icons: {
    icon: "/logo.png",
  },
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${josefin?.className} relative bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-4 md:px-8 py-12 grid">
          <main className=" max-w-7xl mx-auto w-full">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
