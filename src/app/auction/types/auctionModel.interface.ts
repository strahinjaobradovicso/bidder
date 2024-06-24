import { ItemModel } from "../../item/types/itemModel.interface"
import { AuctionStatus } from "./auctionStatus.enum"

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