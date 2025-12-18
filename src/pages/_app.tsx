import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/context/authContext"; // 1. Import ini

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={`${plusJakartaSans.variable} font-sans min-h-screen`}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
