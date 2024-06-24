import { PaginationQuery } from "../../shared/types/paginationQuery.interface";
import { AuctionStatus } from "./auctionStatus.enum";

export interface AuctionQuery extends PaginationQuery {
    date: Date | undefined,
    itemTitle: string | undefined,
    itemOwner: number | undefined,
    auctionWinner: number | undefined,
    status: AuctionStatus | undefined
}