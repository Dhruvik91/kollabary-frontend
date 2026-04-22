import { OrdersContainer } from '@/features/orders/OrdersContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Order History | Kollabary',
    description: 'Track your KC coin purchases and payment status.',
};

export default function OrdersPage() {
    return <OrdersContainer />;
}
