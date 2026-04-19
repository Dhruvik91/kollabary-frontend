import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Scale your brand through authentic human connections on Kollabary.",
};

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
      {/* <Footer /> */}
    </div>
  );
}
