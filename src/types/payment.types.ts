export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
}

export interface TopUpPlan {
    id: string;
    name: string;
    amount: number | string;
    coins: number;
    bonusCoins?: number;
    isActive: boolean;
    description?: string;
    imageUrl?: string;
    isPopular?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTopUpPlanDto {
    name: string;
    amount: number;
    coins: number;
    isActive?: boolean;
    bonusCoins?: number;
    description?: string;
    imageUrl?: string;
    isPopular?: boolean;
}

export interface UpdateTopUpPlanDto extends Partial<CreateTopUpPlanDto> { }

export interface PaymentOrder {
    id: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    status: PaymentStatus;
    amount: number | string;
    currency: string;
    coins: number;
    razorpaySignature?: string;
    metadata?: any;
    createdAt: string;
}

export interface InitiateTopUpResponse {
    orderId: string;
    amount: number;
    currency: string;
    key: string;
    prefill?: {
        name: string;
        email: string;
    };
}

export interface VerifyPaymentDto {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}
