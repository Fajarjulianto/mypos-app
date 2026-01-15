import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data dianggap fresh selama 1 menit (tidak refetch)
            refetchOnWindowFocus: false, // Opsional: matikan refetch saat ganti tab
          },
        },
      })
  );

  return (
    <AuthProvider>
      <main className={`${plusJakartaSans.variable} font-sans min-h-screen`}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </AuthProvider>
  );
}
