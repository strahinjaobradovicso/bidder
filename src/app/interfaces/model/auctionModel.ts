import { ItemModel } from "./itemModel"

export enum AuctionStatus {
    Upcoming = 'UPCOMING',
    Started = 'STARTED',
    Done = 'DONE'
}

export interface AuctionModel {
    id: number
    start: Date
    lastBid?: number
    status: AuctionStatus
    ItemModel: ItemModel
    ownerId?: number
    winnerId?: number
    startingBid: number
}