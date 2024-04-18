import { AuctionStatus } from "../model/auctionModel";
import { PaginationQuery } from "./paginationQuery";

export interface AuctionQuery extends PaginationQuery {
    date: Date | undefined,
    itemTitle: string | undefined,
    itemOwner: number | undefined,
    auctionWinner: number | undefined,
    status: AuctionStatus | undefined
}