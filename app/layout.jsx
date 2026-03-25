import React from "react";
import "../app/assets/styles/global.css";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Logo from "./components/ui/Logo";
export const metadata = {
  title: "The Wild Oasis",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
