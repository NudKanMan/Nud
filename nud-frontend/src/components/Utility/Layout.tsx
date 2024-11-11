// src/components/Utility/Layout.tsx
import React from "react";
import Navbar from "./Navbar"; // Make sure Navbar is exported correctly
import Footer from "./Footer"; // Make sure Footer is exported correctly

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
