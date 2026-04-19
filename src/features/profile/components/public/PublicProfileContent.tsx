'use client';

import React, { useState, useEffect } from 'react';
import { AlignLeft, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface PublicProfileContentProps {
    bio?: string;
    collaborators?: any[];
}

export const PublicProfileContent = ({
    bio,
    collaborators = [],
}: PublicProfileContentProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    // Sync Carousel stats
    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <div className="lg:col-span-2 space-y-12">
            <Card className="rounded-[3rem] border-border/50 bg-card/30 glass-card p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <AlignLeft size={24} />
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter uppercase italic">About the Brand</h3>
                    </div>
                    <p className="text-xl text-muted-foreground/90 leading-relaxed font-bold italic">
                        {bio || "This visionary brand is currently focused on crafting their profile."}
                    </p>
                </div>
            </Card>

            {/* Trusted by Creators Carousel */}
            {collaborators.length > 0 && (
                <div className="space-y-8">
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full group"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-primary rounded-full" />
                                <h3 className="text-2xl font-black tracking-tight uppercase">Trusted by Creators</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                {count > 1 && (
                                    <div className="px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                                        {current} <span className="mx-1 text-muted-foreground/30">/</span> {count}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <CarouselPrevious className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                    <CarouselNext className="static translate-y-0 bg-background border-border/50 text-foreground hover:bg-primary hover:text-white transition-all shadow-sm size-10 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <CarouselContent className="-ml-4">
                                {collaborators.map((creator: any) => (
                                    <CarouselItem key={creator.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                                        <Link href={`/i/${creator.id}`} className="block h-full group/card">
                                            <div className="flex items-center gap-4 p-5 bg-card/30 border border-border/50 rounded-[2rem] glass-card hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                                                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative border-2 border-border/50 group-hover/card:border-primary/50 transition-all">
                                                    {creator.avatarUrl ? (
                                                        <Image src={creator.avatarUrl} alt="" fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-primary/30 text-xl font-black uppercase">
                                                            {creator.fullName?.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="grow">
                                                    <p className="text-sm font-black tracking-tight group-hover/card:text-primary transition-colors line-clamp-1">{creator.fullName}</p>
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">View Profile</p>
                                                        <ArrowRight size={10} className="text-primary opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                </div>
            )}
        </div>
    );
};


