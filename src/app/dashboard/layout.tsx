import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Kollabary',
    description: 'Your Kollabary dashboard',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
