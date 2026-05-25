'use client';

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { ForBrands } from '../components/ForBrands';
import { ForCreators } from '../components/ForCreators';
import { HowItWorks } from '../components/HowItWorks';
import { Benefits } from '../components/Benefits';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

/**
 * LandingOneContainer (Smart Container Component)
 * Orchestrates presentational components for the modern Kollabary landing page
 */
export function LandingOneContainer() {
    return (
        <div className="flex min-h-screen flex-col bg-background antialiased selection:bg-primary/10 selection:text-primary">
            {/* Navigation Header */}
            <Header />

            {/* Main Landing Sections */}
            <main className="flex-grow">
                <Hero />
                <Problem />
                <Solution />
                <ForBrands />
                <ForCreators />
                <HowItWorks />
                <Benefits />
                <CTASection />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
