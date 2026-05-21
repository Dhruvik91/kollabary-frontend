import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Features } from "@/components/landing/Features";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { KCEconomy } from "@/components/landing/KCEconomy";
import { RankingSystem } from "@/components/landing/RankingSystem";
import { Community } from "@/components/landing/Community";
import { FAQ } from "@/components/landing/FAQ";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col">
          <Hero />
          <TrustedBy />
          <Features />
          <HowItWorks />
          <KCEconomy />
          <RankingSystem />
          <FAQ />
          <Community />
        </div>
      </main>
      <Footer />
    </div>
  );
}
