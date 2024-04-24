export const environment = {
    API_URL: 'http://localhost:3000',
    ITEM_KEY_STATE: 'item-key',
    AUCTION_KEY_STATE: 'auction-key',
    AUTH_HEADER_KEY: 'Bearer',
    TOKEN_STORAGE_KEY: 'token',
    API_URLS: {
        AUCTION: 'http://localhost:3000/auctions',
        SIGNUP: 'http://localhost:3000/users/signUp',
        LOGIN: 'http://localhost:3000/auth/login',
        ITEM: 'http://localhost:3000/items'
    },
    SOCKET: {
        BIDDING_NAMESPACE: 'http://localhost:3000/auctions'
    },
    BIDDING: {
        AUCTION_DURATION_SEC: 60
    }
    
}