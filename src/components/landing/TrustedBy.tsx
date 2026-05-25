'use client';

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    { name: 'Aura Fashion', logo: 'AURA' },
    { name: 'Nexus Tech', logo: 'NEXUS' },
    { name: 'Velocity Gear', logo: 'VELOCITY' },
    { name: 'Lumina Beauty', logo: 'LUMINA' },
    { name: 'Zenith Watches', logo: 'ZENITH' },
    { name: 'Vortex Media', logo: 'VORTEX' },
];

export const TrustedBy = () => {
    return (
        <section className="py-12 md:py-16 border-y border-border bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6">
                <p className="text-center text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-10 md:mb-12">
                    Empowering collaborations for visionary brands
                </p>
                
                <div className="relative flex overflow-hidden">
                    {/* First row of logos */}
                    <motion.div 
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 shrink-0"
                    >
                        {brands.concat(brands).map((brand, idx) => (
                            <div 
                                key={idx} 
                                className="text-xl md:text-3xl font-black text-muted-foreground/20 hover:text-primary/40 transition-colors cursor-default select-none tracking-tighter"
                            >
                                {brand.name}
                            </div>
                        ))}
                    </motion.div>
                    
                    {/* Duplicate row for seamless loop */}
                    <motion.div 
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 shrink-0"
                        aria-hidden="true"
                    >
                        {brands.concat(brands).map((brand, idx) => (
                            <div 
                                key={`dup-${idx}`} 
                                className="text-xl md:text-3xl font-black text-muted-foreground/20 hover:text-primary/40 transition-colors cursor-default select-none tracking-tighter"
                            >
                                {brand.name}
                            </div>
                        ))}
                    </motion.div>

                    {/* Fades for smooth edge transition */}
                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-linear-to-r from-background to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-linear-to-l from-background to-transparent z-10" />
                </div>
            </div>
        </section>
    );
};
