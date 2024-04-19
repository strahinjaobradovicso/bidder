import { AddSuffix } from "../../util/addSufix";
import { BidToClient } from "../model/bidModel";
import { EventResponse } from "../response/eventResponse";

export type ListenEvents = AddSuffix<{
    enterAuction: (res: EventResponse, auctionBid?: BidToClient) => void;
    placeBid: (res: EventResponse, newAskBid?: BidToClient) => void;
}, 'ToClient'> & {
    loweredAskBid: (auctionBid: BidToClient) => void;
    auctionResult: (auctionBid: BidToClient) => void;
}
