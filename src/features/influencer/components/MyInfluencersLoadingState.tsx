import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const MyInfluencersLoadingState = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                    <Card className="border-border/40 bg-card/40 rounded-[2rem] h-full flex flex-col p-0">
                        <CardContent className="p-0 flex flex-col flex-1">
                            <Skeleton className="h-28 w-full rounded-t-[2rem]" />
                            
                            <div className="relative px-6 -mt-12 mb-4">
                                <div className="flex justify-between items-end">
                                    <Skeleton className="w-20 h-20 rounded-2xl" />
                                    <Skeleton className="w-16 h-6 rounded-full" />
                                </div>
                            </div>

                            <div className="px-6 pb-6 space-y-4 flex flex-col flex-1">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>

                                <Skeleton className="h-20 w-full rounded-2xl" />

                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <Skeleton className="h-11 rounded-xl" />
                                    <Skeleton className="h-11 rounded-xl" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
