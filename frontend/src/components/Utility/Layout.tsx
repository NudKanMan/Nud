// src/components/Utility/Layout.tsx
import React from "react";
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
import Footer from "./Footer";
import dynamic from "next/dynamic";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <Navbar />
      <main className="flex-grow py-8 px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
