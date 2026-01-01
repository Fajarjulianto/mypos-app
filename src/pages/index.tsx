import { Benefits } from "@/components/landing/Benefits";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
