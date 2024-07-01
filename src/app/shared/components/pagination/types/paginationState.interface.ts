export interface PaginationStateInteface {
    totalRecords: number,
    recordsPerPage: number,
    page: {
        index: number
        toLoad: boolean
    }
    
}