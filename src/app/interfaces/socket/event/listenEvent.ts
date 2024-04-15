import { AddSuffix } from "../../util/addSufix";
import { BidToClient } from "../model/bidModel";
import { EventResponse } from "../response/eventResponse";

export type ListenEvents = AddSuffix<{
    enterAuction: (res: EventResponse, auctionKey: string, auctionBid: BidToClient) => void;
    placeBid: (res: EventResponse, auctionKey: string, newAskBid: BidToClient) => void;
}, 'ToClient'> & {
    loweredAskBid: (auctionKey: string, auctionBid: BidToClient) => void;
    auctionResult: (auctionKey: string, auctionBid: BidToClient) => void;
}
