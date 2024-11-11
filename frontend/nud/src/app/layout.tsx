// /src/app/layout.tsx
"use client"; // Add this line to make the layout a Client Component

import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "./contexts/ModalContext";
import { SessionProvider } from "next-auth/react";
import Modal from "./components/modals/CreateActivityModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider> 
          <ModalProvider> 
            {children}
            <Modal /> 
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}