import { Bidder } from "./bidderModel"

export interface AuctionRules {
    start: Date
    end: Date
    startingBid: number
    bidIncrement: number
}

export interface BidToClient {
    bidder?: Bidder
    askValue: number
    auctionRules?: AuctionRules
    reachedValue: number
    isFinal: boolean
}

export interface BidToServer {
    auctionId: string
    value: number
}