import { PaginationQuery } from "../../shared/types/paginationQuery.interface";

export interface ItemQuery extends PaginationQuery {
    title: string | undefined;
}