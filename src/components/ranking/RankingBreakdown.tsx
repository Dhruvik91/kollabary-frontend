'use client';

import { useRankingBreakdown } from '@/hooks/ranking/useRankingBreakdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    TrendingUp,
    Star,
    CheckCircle2,
    Clock,
    Award,
    AlertTriangle,
    Trophy
} from 'lucide-react';

interface RankingBreakdownProps {
    influencerId: string;
    showTitle?: boolean;
}

export function RankingBreakdown({ influencerId, showTitle = true }: RankingBreakdownProps) {
    const { data: breakdown, isLoading, error } = useRankingBreakdown(influencerId);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-2 w-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (error || !breakdown) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-yellow-500" />
                    <p>Unable to load ranking breakdown</p>
                </CardContent>
            </Card>
        );
    }

    const maxScore = 1500; // Theoretical maximum score
    const scorePercentage = (breakdown.totalScore / maxScore) * 100;

    // Determine rank tier based on score
    const getRankTier = (score: number) => {
        if (score >= 1200) return { name: 'Elite', color: 'bg-gradient-to-r from-purple-500 to-pink-500', textColor: 'text-purple-600' };
        if (score >= 900) return { name: 'Expert', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', textColor: 'text-blue-600' };
        if (score >= 600) return { name: 'Professional', color: 'bg-gradient-to-r from-green-500 to-emerald-500', textColor: 'text-green-600' };
        if (score >= 300) return { name: 'Rising Star', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', textColor: 'text-yellow-600' };
        return { name: 'Beginner', color: 'bg-gradient-to-r from-gray-400 to-gray-500', textColor: 'text-gray-600' };
    };

    const rankTier = getRankTier(breakdown.totalScore);

    const factors = [
        {
            icon: CheckCircle2,
            label: 'Completed Collaborations',
            count: breakdown.completedCollaborations.count,
            score: breakdown.completedCollaborations.score,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            icon: Star,
            label: 'Average Rating',
            count: `${breakdown.averageRating.value.toFixed(1)}/5.0`,
            score: breakdown.averageRating.score,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
        },
        {
            icon: TrendingUp,
            label: 'Completion Rate',
            count: `${breakdown.completionRate.percentage.toFixed(0)}%`,
            score: breakdown.completionRate.score,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            icon: Clock,
            label: 'Response Speed',
            count: `${breakdown.responseSpeed.hours.toFixed(1)}h avg`,
            score: breakdown.responseSpeed.score,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
    ];

    if (breakdown.verificationBonus.isVerified) {
        factors.push({
            icon: Award,
            label: 'Verified Influencer',
            count: '✓',
            score: breakdown.verificationBonus.score,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
        });
    }

    if (breakdown.penalties.score < 0) {
        factors.push({
            icon: AlertTriangle,
            label: 'Penalties',
            count: breakdown.penalties.count.toString(),
            score: breakdown.penalties.score,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        });
    }

    return (
        <Card className="overflow-hidden">
            {showTitle && (
                <CardHeader className={`${rankTier.color} text-white`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-white">
                                <Trophy className="h-6 w-6" />
                                Ranking Breakdown
                            </CardTitle>
                            <CardDescription className="text-white/90 mt-1">
                                Performance-based influencer score
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-white">
                                {breakdown.totalScore.toFixed(0)}
                            </div>
                            <Badge variant="secondary" className="mt-1">
                                {rankTier.name}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
            )}

            <CardContent className="pt-6 space-y-6">
                {/* Overall Score Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Overall Score</span>
                        <span className={`font-bold ${rankTier.textColor}`}>
                            {breakdown.totalScore.toFixed(0)} / {maxScore}
                        </span>
                    </div>
                    <Progress value={scorePercentage} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">
                        Top {(100 - scorePercentage).toFixed(0)}% of influencers
                    </p>
                </div>

                {/* Individual Factors */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Score Breakdown
                    </h4>
                    {factors.map((factor, index) => {
                        const Icon = factor.icon;
                        const factorPercentage = Math.min(
                            (Math.abs(factor.score) / maxScore) * 100,
                            100
                        );

                        return (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${factor.bgColor}`}>
                                            <Icon className={`h-4 w-4 ${factor.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{factor.label}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {factor.count}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`font-semibold ${factor.score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {factor.score >= 0 ? '+' : ''}{factor.score.toFixed(0)}
                                    </span>
                                </div>
                                <Progress
                                    value={factorPercentage}
                                    className={`h-2 ${factor.score < 0 ? 'bg-red-100' : ''}`}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Tips for Improvement */}
                {breakdown.totalScore < 900 && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
                            💡 Tips to Improve Your Ranking
                        </h4>
                        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                            {breakdown.completedCollaborations.count < 10 && (
                                <li>• Complete more collaborations to boost your score</li>
                            )}
                            {breakdown.averageRating.value < 4.5 && (
                                <li>• Maintain high-quality work to improve your ratings</li>
                            )}
                            {breakdown.responseSpeed.hours > 24 && (
                                <li>• Respond faster to collaboration requests</li>
                            )}
                            {!breakdown.verificationBonus.isVerified && (
                                <li>• Get verified to earn a +100 bonus</li>
                            )}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
