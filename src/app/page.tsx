'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background decoration */}
      <div className="bg-blur-shape bg-blur-shape-1" />
      <div className="bg-blur-shape bg-blur-shape-2" />
      <div className="bg-blur-shape bg-blur-shape-3" />

      <div className="container px-6 pt-10 pb-24 mx-auto sm:pt-40 sm:pb-32 lg:px-8 lg:pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Kollabary: Where Influencers & Brands Unite
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The premier marketplace for meaningful collaborations. Scale your social presence or find the perfect brand partner with our AI-driven platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mt-10 gap-x-6"
          >
            <Link
              href="/influencers/search"
              className="px-6 py-3 text-sm font-semibold text-white transition-all rounded-full shadow-lg bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              Explore Influencers
            </Link>
            <Link href="/auth/signup" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-1 group">
              Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-8 mt-24 sm:grid-cols-3">
          {[
            {
              title: 'Fast Growth',
              description: 'Accelerate your brand reach with top-tier social media talent.',
              icon: Zap,
              color: 'text-yellow-500'
            },
            {
              title: 'Verified Partners',
              description: 'Every influencer and brand on our platform is thoroughly vetted.',
              icon: Shield,
              color: 'text-green-500'
            },
            {
              title: 'Premium Quality',
              description: 'Experience a seamless collaboration flow from start to finish.',
              icon: Star,
              color: 'text-purple-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl glass-enhanced hover:border-primary/50 transition-colors"
            >
              <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
