import { Collaboration } from '@/types/collaboration.types';
import { CollaborationStatusBadge } from './CollaborationStatusBadge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

interface CollaborationCardProps {
    collaboration: Collaboration;
    isInfluencer?: boolean;
}

export const CollaborationCard = ({ collaboration, isInfluencer }: CollaborationCardProps) => {
    const partner = isInfluencer ? collaboration.requester : collaboration.influencer;
    const dateRange = collaboration.startDate && collaboration.endDate
        ? `${format(new Date(collaboration.startDate), 'MMM d')} - ${format(new Date(collaboration.endDate), 'MMM d, yyyy')}`
        : 'Request Pending';

    return (
        <Card className="hover:shadow-lg transition-all duration-300 border-border group overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                    <CollaborationStatusBadge status={collaboration.status} />
                    <span className="text-xs text-muted-foreground">{format(new Date(collaboration.createdAt), 'MMM d, yyyy')}</span>
                </div>
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {collaboration.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                    {collaboration.description || 'No description provided.'}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <UserIcon size={14} className="text-primary" />
                        <span className="font-medium text-foreground">{partner.email.split('@')[0]}</span>
                        <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold ml-auto">
                            {isInfluencer ? 'Brand' : 'Influencer'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span>{dateRange}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-border bg-muted/20">
                <Link href={FRONTEND_ROUTES.DASHBOARD.COLLABORATION_DETAIL(collaboration.id)} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-between hover:bg-primary/10 hover:text-primary group">
                        View Details
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
