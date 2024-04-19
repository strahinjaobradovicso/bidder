import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EventStatus } from '../interfaces/socket/response/eventResponse';
import { BidToClient, BidToServer } from '../interfaces/socket/model/bidModel';
import { ListenEvents } from '../interfaces/socket/event/listenEvent';
import { EmitEvents } from '../interfaces/socket/event/emitEvent';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {

  socket?: Socket<ListenEvents, EmitEvents>;
  url = environment.socket.BIDDING_NAMESPACE;
  headerKey = environment.AUTH_HEADER_KEY;
  tokenKey = environment.TOKEN_STORAGE_KEY;

  enterAuctionToServer(roomKey: string): Observable<string> {
    const token = localStorage.getItem(this.tokenKey);
    this.socket = io(this.url, {
      extraHeaders: {
        Authorization: `${this.headerKey}: ${token}` 
      }
    })
    const observable = new Observable<any>
    (observer => {
      this.socket?.on('connect_error', (err) => {
        this.socket?.disconnect();
        observer.error(err);
      })
      this.socket?.on('connect', () => {
        this.socket?.emit('enterAuctionToServer', roomKey);
        observer.complete();
      })
    })
    return observable;
  }

  placeBidToServer(auctionId: string, value: number) {
    const bid: BidToServer = {
      auctionId: auctionId,
      value: value
    }
    this.socket?.emit('placeBidToServer', bid);
  }

  enterAuctionToClient() {
    const observable = new Observable<BidToClient>
    (observer => {
      this.socket?.on('enterAuctionToClient', (res, auctionBid) => {
        if(res.status === EventStatus.Failure){
          observer.error(res.message);
        }
        else{
          if(!auctionBid || !auctionBid.auctionRules){
            throw new Error('Could not enter auction');
          }
          auctionBid.auctionRules.start = new Date(auctionBid.auctionRules.start);
          observer.next(auctionBid);
        }
      })
    })
    return observable;
  }

  placeBidToClient() {
    const observable = new Observable<BidToClient>
    (observer => {
      this.socket?.on('placeBidToClient', (res, auctionBid) => {
        if(res.status === EventStatus.Success) {
          observer.next(auctionBid);
        }
      })
    })
    return observable;
  }

  loweredAskBid() {
    const observable = new Observable<BidToClient>
    (observer => {
      this.socket?.on('loweredAskBid', (auctionBid) => {
        observer.next(auctionBid);
      })
    })
    return observable;
  }
  
  auctionResult() {
    const observable = new Observable<BidToClient>
    (observer => {
      this.socket?.on('auctionResult', (auctionBid) => {
        observer.next(auctionBid);
      })
    })
    return observable;
  }

}
