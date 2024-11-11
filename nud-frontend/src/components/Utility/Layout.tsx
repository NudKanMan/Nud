// src/components/Utility/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
