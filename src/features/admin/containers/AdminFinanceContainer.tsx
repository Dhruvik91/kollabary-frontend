'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
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
import {
    IndianRupee,
    TrendingUp,
    ShoppingCart,
    Coins,
    ArrowUpRight,
} from 'lucide-react';
import { FinanceStats } from '@/types/admin.types';
import { toast } from 'sonner';

export const AdminFinanceContainer = () => {
    const [range, setRange] = useState('THIS_MONTH');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [stats, setStats] = useState<FinanceStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFinanceData = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.getFinanceStats({
                range,
                startDate: range === 'CUSTOM' ? startDate : undefined,
                endDate: range === 'CUSTOM' ? endDate : undefined
            });
            setStats(data);
        } catch (error) {
            toast.error('Failed to fetch financial stats');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (range !== 'CUSTOM') {
            fetchFinanceData();
        }
    }, [range]);

    return (
        <div className="space-y-8 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Financial Overview</h1>
                    <p className="text-muted-foreground mt-1">Track revenue and KC coin sales across the platform.</p>
                </div>

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
                            <Button size="sm" onClick={fetchFinanceData}>Apply</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IndianRupee className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₹{stats?.totalRevenue?.toLocaleString() || 0}</div>
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-500">
                            <TrendingUp className="w-3 h-3" />
                            <span>Platform Earnings</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">KC Coins Sold</CardTitle>
                        <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                            <Coins className="w-5 h-5 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.totalCoinsSold?.toLocaleString() || 0} KC</div>
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-amber-500">
                            <span>Digital Currency Flow</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Orders</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.orderCount || 0}</div>
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-blue-500">
                            <span>Transaction Count</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Success Rate</CardTitle>
                        <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.successRate?.toFixed(1) || 0}%</div>
                        <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-500">
                            <span>Payment Reliability</span>
                        </div>
                    </CardContent>
                </Card>
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
                </CardContent>
            </Card>
        </div>
    );
};
