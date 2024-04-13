import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EventResponse, EventStatus } from '../interfaces/socket/response/eventResponse';
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

  constructor() { }

  initSocket(){

    const token = localStorage.getItem(this.tokenKey);
    this.socket = io(this.url, {
      extraHeaders: {
        Authorization: `${this.headerKey}: ${token}` 
      }
    })
  }

  enterAuctionToServer(roomKey: string): Observable<string> {
    this.initSocket();
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
    const observable = new Observable<{ res: EventResponse, auctionKey: string, auctionBid: BidToClient }>
    (observer => {
      this.socket?.on('enterAuctionToClient', (res, auctionKey, auctionBid) => {
        if(res.status === EventStatus.Failure){
          observer.error(res.message);
        }
        else{
          observer.next({ res, auctionKey, auctionBid });
        }
      })
    })
    return observable;
  }

  placeBidToClient() {
    const observable = new Observable<{ res: EventResponse, auctionKey: string, auctionBid: BidToClient }>
    (observer => {
      this.socket?.on('placeBidToClient', (res, auctionKey, auctionBid) => {
        if(res.status === EventStatus.Failure){
          observer.error(res.message);
        }
        else{
          observer.next({ res, auctionKey, auctionBid });
        }
      })
    })
    return observable;
  }

  loweredAskBid() {
    const observable = new Observable<{ auctionKey: string, askValue: number}>
    (observer => {
      this.socket?.on('loweredAskBid', (auctionKey, askValue) => {
        observer.next({ auctionKey, askValue });
      })
    })
    return observable;
  }
  
  auctionResult() {
    const observable = new Observable<{ auctionKey: string, auctionBid: BidToClient }>
    (observer => {
      this.socket?.on('auctionResult', (auctionKey, auctionBid) => {
        observer.next({auctionKey, auctionBid});
      })
    })
    return observable;
  }

}
