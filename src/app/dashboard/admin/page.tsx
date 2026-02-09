'use client';

import { useAdminStats } from '@/hooks/admin/useAdminStats';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Users,
    Handshake,
    ShieldCheck,
    Star,
    TrendingUp,
    UserPlus,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ElementType;
    trend?: {
        value: number;
        label: string;
    };
    color?: string;
}

function StatCard({ title, value, description, icon: Icon, trend, color = 'text-blue-600' }: StatCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value.toLocaleString()}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
                {trend && (
                    <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                            +{trend.value} {trend.label}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function StatsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-3 w-32 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    const { data: stats, isLoading, error } = useAdminStats();

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <Skeleton className="h-10 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <StatsSkeleton />
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card>
                    <CardContent className="py-12 text-center">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                        <h3 className="text-lg font-semibold mb-2">Failed to Load Statistics</h3>
                        <p className="text-muted-foreground">Please try refreshing the page</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Platform overview and key metrics
                </p>
            </div>

            {/* User Statistics */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value={stats.users.totalUsers}
                        icon={Users}
                        trend={{ value: stats.users.newUsersThisWeek, label: 'this week' }}
                        color="text-blue-600"
                    />
                    <StatCard
                        title="Regular Users"
                        value={stats.users.regularUsers}
                        description="Brands and requesters"
                        icon={UserPlus}
                        color="text-green-600"
                    />
                    <StatCard
                        title="Influencers"
                        value={stats.users.influencers}
                        description="Content creators"
                        icon={Star}
                        color="text-purple-600"
                    />
                    <StatCard
                        title="Admins"
                        value={stats.users.admins}
                        description="Platform moderators"
                        icon={ShieldCheck}
                        color="text-orange-600"
                    />
                </div>
            </div>

            {/* Collaboration Statistics */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Collaboration Statistics</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Collaborations"
                        value={stats.collaborations.totalCollaborations}
                        icon={Handshake}
                        color="text-blue-600"
                    />
                    <StatCard
                        title="Active"
                        value={stats.collaborations.activeCollaborations}
                        description="In progress"
                        icon={Clock}
                        color="text-yellow-600"
                    />
                    <StatCard
                        title="Completed"
                        value={stats.collaborations.completedCollaborations}
                        description={`${stats.collaborations.completionRate.toFixed(1)}% completion rate`}
                        icon={CheckCircle2}
                        color="text-green-600"
                    />
                    <StatCard
                        title="Pending Requests"
                        value={stats.collaborations.pendingRequests}
                        description="Awaiting response"
                        icon={AlertCircle}
                        color="text-orange-600"
                    />
                </div>
            </div>

            {/* Verification & Reviews */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Statistics</CardTitle>
                        <CardDescription>Influencer verification requests</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Total Requests</span>
                            <span className="text-2xl font-bold">{stats.verifications.totalRequests}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Pending</span>
                            <span className="text-lg font-semibold text-yellow-600">
                                {stats.verifications.pendingRequests}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Approved</span>
                            <span className="text-lg font-semibold text-green-600">
                                {stats.verifications.approvedRequests}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Rejected</span>
                            <span className="text-lg font-semibold text-red-600">
                                {stats.verifications.rejectedRequests}
                            </span>
                        </div>
                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Approval Rate</span>
                                <span className="text-xl font-bold text-green-600">
                                    {stats.verifications.approvalRate.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Review Statistics</CardTitle>
                        <CardDescription>Platform ratings and feedback</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Total Reviews</span>
                            <span className="text-2xl font-bold">{stats.reviews.totalReviews}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Average Rating</span>
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-semibold">
                                    {stats.reviews.averageRating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">This Week</span>
                            <span className="text-lg font-semibold text-blue-600">
                                {stats.reviews.reviewsThisWeek}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">This Month</span>
                            <span className="text-lg font-semibold text-purple-600">
                                {stats.reviews.reviewsThisMonth}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Platform Growth Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Platform Growth (Last 8 Weeks)</CardTitle>
                    <CardDescription>New users, collaborations, and reviews over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={stats.growth}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="week"
                                className="text-xs"
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis
                                className="text-xs"
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="newUsers"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                name="New Users"
                            />
                            <Line
                                type="monotone"
                                dataKey="newCollaborations"
                                stroke="#10b981"
                                strokeWidth={2}
                                name="New Collaborations"
                            />
                            <Line
                                type="monotone"
                                dataKey="newReviews"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                name="New Reviews"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
