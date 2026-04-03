import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col">
          <Hero />
          <Features />

        </div>
      </main>
      <Footer />
    </div>
  );
}
