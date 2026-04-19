export enum TransactionType {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum TransactionPurpose {
    AUCTION_CREATION = 'AUCTION_CREATION',
    COLLABORATION_CREATION = 'COLLABORATION_CREATION',
    BID_PLACEMENT = 'BID_PLACEMENT',
    DAILY_ALLOWANCE = 'DAILY_ALLOWANCE',
    REFERRAL_REWARD = 'REFERRAL_REWARD',
    SIGNUP_BONUS = 'SIGNUP_BONUS',
    SYSTEM_ADJUSTMENT = 'SYSTEM_ADJUSTMENT',
}

export interface Wallet {
    id: string;
    balance: number | string;
    createdAt: string;
    updatedAt: string;
}

export interface KCTransaction {
    id: string;
    amount: number | string;
    type: TransactionType;
    purpose: TransactionPurpose;
    metadata?: any;
    createdAt: string;
}

export interface TransactionResponse {
    items: KCTransaction[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
