import { Metadata } from 'next';
import DashboardClientLayout from './dashboard-client-layout';

export const metadata: Metadata = {
    title: 'Dashboard | Kollabary',
    description: 'Your Kollabary dashboard',
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
