import { Injectable } from '@angular/core';
import { BidToClient } from '../types/bidToClient.interface';
import { BidSocket } from '../../core/sockets/bidSocket';
import { BidToServer } from '../types/bidToServer.interface';

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
