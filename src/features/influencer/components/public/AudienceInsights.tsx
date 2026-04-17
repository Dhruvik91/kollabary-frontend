'use client';

import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Users, Globe, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

interface AudienceInsightsProps {
    genderRatio?: Record<string, number>;
    ageBrackets?: Record<string, number>;
    topCountries?: string[];
}

export const AudienceInsights = ({
    genderRatio,
    ageBrackets,
    topCountries,
}: AudienceInsightsProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Transform gender ratio for Pie Chart
    const genderData = genderRatio ? Object.entries(genderRatio).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: value * 100,
    })) : [];

    // Transform age brackets for Bar Chart
    const ageData = ageBrackets ? Object.entries(ageBrackets).map(([name, value]) => ({
        name,
        value: value * 100,
    })) : [];

    const COLORS = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'];

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Users size={22} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">Audience Insights</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender Distribution */}
                <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <PieChartIcon size={20} className="text-primary" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/70">Gender Split</h4>
                    </div>

                    <div className="h-[250px] w-full">
                        {isMounted && genderData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={10} minHeight={250} debounce={100}>
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                        itemStyle={{ color: 'white', fontWeight: 'bold' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                                Not enough data for gender split
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                        {genderData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs font-black uppercase tracking-tighter opacity-70">{entry.name} {entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Age Brackets */}
                <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <BarChart3 size={20} className="text-primary" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/70">Age Range</h4>
                    </div>

                    <div className="h-[250px] w-full">
                        {isMounted && ageData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250} debounce={100}>
                                <BarChart data={ageData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor', opacity: 0.5 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                        itemStyle={{ color: 'white', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                                Not enough data for age range
                            </div>
                        )}
                    </div>
                </Card>

                {/* Top Countries */}
                {topCountries && topCountries.length > 0 && (
                    <Card className="rounded-[2.5rem] border-border/50 bg-card/30 glass-card p-8 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe size={20} className="text-primary" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground/70">Top Locations</h4>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {topCountries.map((country, i) => (
                                <div key={country} className="flex items-center gap-3 grow p-4 bg-background/30 rounded-2xl border border-border/50">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                                        {i + 1}
                                    </div>
                                    <span className="text-lg font-black tracking-tighter">{country}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};
