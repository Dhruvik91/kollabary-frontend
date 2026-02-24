import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="flex flex-col">
          <Hero />
          <Features />

          {/* Dynamic Stats/CTA Section */}
          <section className="py-24 container mx-auto px-6">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-primary-foreground relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 max-w-2xl">
                  Ready to redefine your influencer strategy?
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-12 max-w-xl leading-relaxed">
                  Join 500+ premium brands scaling their reach through authentic human partnerships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button
                    variant={null}
                    className="h-14 px-10 bg-primary-foreground text-primary font-bold rounded-full hover:bg-primary-foreground hover:opacity-90 transition-all duration-300 shadow-xl shadow-black/10">
                    Get Started Now
                  </Button>
                  <Button variant={null} className="h-14 px-10 border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-sm text-primary-foreground font-bold rounded-full hover:bg-primary-foreground/10 transition-all duration-300">
                    Book a Demo
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
