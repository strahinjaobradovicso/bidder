import { AuctionStatus } from "../model/auctionModel";
import { PaginationQuery } from "./paginationQuery";

export interface AuctionQuery extends PaginationQuery {
    date?: Date,
    itemTitle?: string,
    itemOwner?: number,
    auctionWinner?: number,
    status?: AuctionStatus
}