import { User, Profile } from "./auth.types";
import { CollaborationType } from "./influencer.types";

export enum AuctionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum BidStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  minBudget?: number;
  maxBudget?: number;
  deadline: string;
  status: AuctionStatus;
  category?: CollaborationType;
  creator: User & { profile?: Profile };
  bids?: Bid[];
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  auction: Auction;
  influencer: User & { profile?: Profile };
  amount: number;
  proposal: string;
  status: BidStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAuctionDto {
    title: string;
    description: string;
    minBudget?: number;
    maxBudget?: number;
    deadline: string;
    category?: CollaborationType;
}

export interface CreateBidDto {
    amount: number;
    proposal: string;
}
