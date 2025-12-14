import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function Home() {
  return (
    <main
      className={`${plusJakartaSans.variable} font-sans min-h-screen w-full`}
    >
      Landing Page
    </main>
  );
}
