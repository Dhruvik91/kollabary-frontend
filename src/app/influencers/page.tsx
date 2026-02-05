import { Metadata } from "next";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { InfluencerContainer } from "@/components/features/influencer/container/InfluencerContainer";

export const metadata: Metadata = {
    title: 'Browse Influencers | Kollabary',
    description: 'Find the perfect influencers for your next marketing campaign.',
};

export default function InfluencersPage() {
    return (
        <div className="min-h-screen">
            <BackgroundEffects />

            <main className="pt-32 pb-20 px-4">
                <InfluencerContainer />
            </main>
        </div>
    );
}
