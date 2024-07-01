import { PaginationResponse } from "../../shared/types/paginationResponse.interface";
import { ItemModel } from "./itemModel.interface";
import { ItemQuery } from "./itemQuery.interface";

export interface ItemsState {
    items: PaginationResponse<ItemModel>,
    isLoading: boolean,
    error: Error | null,
    query: ItemQuery,
    paginationReset: {
        index: number,
        toLoad: boolean
    }
}