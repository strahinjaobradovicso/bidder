import { AddSuffix } from "../../util/addSufix";
import { BidToServer } from "../model/bidModel";

export type EmitEvents = AddSuffix<{
    enterAuction: (auctionKey: string) => void;
    placeBid: (data: BidToServer) => void;
}, 'ToServer'>