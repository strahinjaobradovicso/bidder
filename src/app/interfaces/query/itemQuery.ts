import { PaginationQuery } from "./paginationQuery";

export interface ItemQuery extends PaginationQuery {
    title: string | undefined;
}