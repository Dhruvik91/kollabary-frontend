import { Metadata } from 'next';
import DashboardClientLayout from './dashboard-client-layout';

export const metadata: Metadata = {
    title: 'Dashboard | Kollabary',
    description: 'Your Kollabary dashboard',
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardClientLayout>
            {children}
        </DashboardClientLayout>
    );
}
