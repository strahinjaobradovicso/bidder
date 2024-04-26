import { Injectable } from '@angular/core';
import { BidToClient, BidToServer } from '../interfaces/model/bidModel';
import { BidSocket } from '../sockets/bidSocket';

@Injectable({
  providedIn: 'root',
})
export class BidService {

  bidAccept = this.socket.fromEvent<BidToClient>('bidAccept');
  bidReject = this.socket.fromEvent<string>('bidReject');
  auctionReject = this.socket.fromEvent<string>('auctionReject');

  constructor(private socket: BidSocket) { }

  enterAuction(room: string){
    this.socket.emit('enterAuction', room);
  }

  placeBid(bid: BidToServer){
    this.socket.emit('placeBid', bid);
  }

}
