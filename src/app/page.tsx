"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { InfluencerCard } from "@/components/features/influencer/InfluencerCard";
import { mockInfluencers } from "@/data/mockInfluencers";

const features = [
  {
    icon: Users,
    title: "Discover Creators",
    description: "Find the perfect influencers for your brand from our curated marketplace of verified creators.",
  },
  {
    icon: Zap,
    title: "Instant Collaboration",
    description: "Connect and collaborate with influencers seamlessly through our streamlined workflow.",
  },
  {
    icon: Shield,
    title: "Secure Partnerships",
    description: "Protected payments and verified profiles ensure safe and trustworthy collaborations.",
  },
  {
    icon: TrendingUp,
    title: "Track Performance",
    description: "Real-time analytics and insights to measure the success of your campaigns.",
  },
];

const stats = [
  { value: "10K+", label: "Creators" },
  { value: "500+", label: "Brands" },
  { value: "$2M+", label: "Paid Out" },
  { value: "98%", label: "Success Rate" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <BackgroundEffects />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">The Future of Influencer Marketing</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Connect Brands with{" "}
              <span className="gradient-text">Influential</span>
              <br />
              Creators
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Kollabary is the premier marketplace where brands discover authentic influencers
              and creators find meaningful collaboration opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/influencers">
                <Button size="lg" className="gradient-bg border-0 glow-primary text-lg px-8 py-6">
                  Explore Creators
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-glass-border hover:bg-glass">
                  Join as Creator
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {stats.map((stat, index) => (
              <GlassCard
                key={stat.label}
                variant="subtle"
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Kollabary</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to run successful influencer marketing campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Featured <span className="gradient-text">Creators</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover top-performing influencers ready to collaborate.
              </p>
            </div>
            <Link href="/influencers" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-glass-border hover:bg-glass">
                View All Creators
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockInfluencers.slice(0, 4).map((influencer, index) => (
              <InfluencerCard key={influencer.id} influencer={influencer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <GlassCard
            variant="elevated"
            className="text-center py-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 gradient-bg opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Collaborating?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of brands and creators building authentic partnerships on Kollabary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="gradient-bg border-0 glow-primary">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-glass-border hover:bg-glass">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
