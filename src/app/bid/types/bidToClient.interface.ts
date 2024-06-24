import { Bidder } from "./bidder.interface"

export interface BidToClient {
    bidder?: Bidder
    askValue: number
    reachedValue: number
    isFinal: boolean
}