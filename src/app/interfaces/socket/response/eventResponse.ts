export enum EventStatus {
    Success = 'SUCCESS',
    Failure = 'FAILURE'
}

export interface EventResponse {
    status: EventStatus
    message?: string
}