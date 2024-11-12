// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Utility/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
