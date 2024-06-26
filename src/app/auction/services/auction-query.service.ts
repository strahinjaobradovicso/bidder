import { signal } from "@angular/core";
import { AuctionQuery } from "../types/auctionQuery.inteface";

export class AuctionQueryService {

  querySignal = signal<AuctionQuery>({
    page: 1,
    itemsPerPage: 4,
    date: undefined,
    itemTitle: undefined,
    itemOwner: undefined,
    auctionWinner: undefined,
    status: undefined
  })

  setPage(page: number){
    this.querySignal.update((query) => {
      return {...query, page};
    })
  }

  setItemTitle(itemTitle: string){
    this.querySignal.update((query) => {
      return {...query, itemTitle, page: 1};
    })
  } 

  setItemOwner(itemOwner: number){
    this.querySignal.update((query) => {
      return {...query, itemOwner};
    })
  }

  setAuctionWinner(auctionWinner: number){
    this.querySignal.update((query) => {
      return {...query, auctionWinner};
    })
  }
}
