'use client';

import { useState, useEffect } from 'react';
import { useFinanceStats } from '@/hooks/use-admin.hooks';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricCard } from '@/features/dashboard/components/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { ArrowUpRight, Coins, IndianRupee, Landmark, ShoppingCart } from 'lucide-react';

export const AdminFinanceContainer = () => {
    const [range, setRange] = useState('THIS_MONTH');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [appliedParams, setAppliedParams] = useState<{
        range: string;
        startDate?: string;
        endDate?: string;
    }>({ range: 'THIS_MONTH' });

    const { data: stats, isLoading } = useFinanceStats(appliedParams);

    useEffect(() => {
        if (range !== 'CUSTOM') {
            setAppliedParams({ range, startDate: undefined, endDate: undefined });
        }
    }, [range]);

    const handleApplyCustomRange = () => {
        setAppliedParams({ range: 'CUSTOM', startDate, endDate });
    };

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Financial Analytics"
                title="Revenue"
                highlightedTitle="Overview"
                subtitle="Track revenue and KC coin sales across the platform."
                icon={Landmark}
                action={
                    <div className="flex items-center gap-2 bg-card p-2 rounded-xl border shadow-sm">
                        <Select value={range} onValueChange={setRange}>
                            <SelectTrigger className="w-[180px] border-none focus:ring-0">
                                <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TODAY">Today</SelectItem>
                                <SelectItem value="THIS_WEEK">This Week</SelectItem>
                                <SelectItem value="THIS_MONTH">This Month</SelectItem>
                                <SelectItem value="LAST_MONTH">Last Month</SelectItem>
                                <SelectItem value="THIS_YEAR">This Year</SelectItem>
                                <SelectItem value="LAST_YEAR">Last Year</SelectItem>
                                <SelectItem value="CUSTOM">Custom Range</SelectItem>
                            </SelectContent>
                        </Select>

                        {range === 'CUSTOM' && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Input
                                    type="date"
                                    className="w-[140px] h-9"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <span className="text-muted-foreground text-sm">to</span>
                                <Input
                                    type="date"
                                    className="w-[140px] h-9"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <Button size="sm" onClick={handleApplyCustomRange}>Apply</Button>
                            </div>
                        )}
                    </div>
                }
            />

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Total Revenue"
                    value={`₹${stats?.totalRevenue?.toLocaleString() || 0}`}
                    icon={IndianRupee}
                    subtitle="Platform Earnings"
                    color="text-primary"
                    isLoading={isLoading}
                />

                <MetricCard
                    label="KC Coins Sold"
                    value={`${stats?.totalCoinsSold?.toLocaleString() || 0} KC`}
                    icon={Coins}
                    subtitle="Digital Currency Flow"
                    color="text-amber-500"
                    isLoading={isLoading}
                />

                <MetricCard
                    label="Total Orders"
                    value={stats?.orderCount || 0}
                    icon={ShoppingCart}
                    subtitle="Transaction Count"
                    color="text-blue-500"
                    isLoading={isLoading}
                />

                <MetricCard
                    label="Success Rate"
                    value={`${stats?.successRate?.toFixed(1) || 0}%`}
                    icon={ArrowUpRight}
                    subtitle="Payment Reliability"
                    color="text-emerald-500"
                    isLoading={isLoading}
                />
            </div>

            {/* Revenue Trends Chart */}
            <Card className="p-6">
                <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Revenue Trends</CardTitle>
                        <p className="text-sm text-muted-foreground">Earnings over the selected period</p>
                    </div>
                </CardHeader>
                <CardContent className="h-[400px] px-0">
                    {isLoading ? (
                        <div className="px-6 py-4 h-full">
                            <Skeleton className="w-full h-full rounded-xl" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.revenueTrends || []}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    tickFormatter={(val) => `₹${val}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                                    }}
                                    formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
