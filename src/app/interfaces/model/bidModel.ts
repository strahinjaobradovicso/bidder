import { Bidder } from "./bidderModel"

export interface BidToClient {
    bidder?: Bidder
    askValue: number
    reachedValue: number
    isFinal: boolean
}

export interface BidToServer {
    auctionId: string
    value: number
}