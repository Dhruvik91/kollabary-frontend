import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { KCEconomy } from "@/components/landing/KCEconomy";
import { RankingSystem } from "@/components/landing/RankingSystem";
import { Community } from "@/components/landing/Community";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col">
          <Hero />
          <Features />
          <HowItWorks />
          <KCEconomy />
          <RankingSystem />
          <Community />
        </div>
      </main>
      <Footer />
    </div>
  );
}
