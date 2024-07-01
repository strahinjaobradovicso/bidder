import { PaginationResponse } from "../../shared/types/paginationResponse.interface";
import { AuctionModel } from "./auctionModel.interface";
import { AuctionQuery } from "./auctionQuery.inteface";

export interface AuctionsState {
    auctions: PaginationResponse<AuctionModel>,
    isLoading: boolean,
    error: Error | null,
    query: AuctionQuery,
    paginationReset: {
        index: number, 
        toLoad: boolean
    }
}