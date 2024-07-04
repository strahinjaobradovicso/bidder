import { BidToClient } from "./bidToClient.interface";

export interface BiddingState {
    auctionRoom: string,
    bid: number,
    ask: BidToClient | null,
    error: Error | null,
    bidRejection: string | null
}