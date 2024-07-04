import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { BidService } from "../services/bid.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, distinctUntilChanged, of, pipe, switchMap, tap } from "rxjs";
import { BiddingState } from "../types/biddingState.interface";

const initalState: BiddingState = {
    auctionRoom: '',
    bid: 0,
    ask: null,
    error: null,
    bidRejection: null
}

export const BiddingStore = signalStore(
    withState(initalState),
    withMethods((store, bidService = inject(BidService)) => ({
        setAuctionRoom(auctionRoom: string) {
            if(auctionRoom != initalState.auctionRoom)
                patchState(store, { auctionRoom });
        },
        setBid(bid: number) {
            if(bid != initalState.bid)
                patchState(store, { bid });
        },
        setAsk: rxMethod<string>(
            pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((room) => {
                    return bidService.bidAccept.pipe(
                        tap((ask) => patchState(store, { ask }))
                    );    
                }),
            )
        ),
        setBidRejection: rxMethod<string>(
            pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((room) => {
                    return bidService.bidReject.pipe(
                        tap((bidRejection) => patchState(store, { bidRejection }))
                    );    
                }),
            )
        ),
        setError: rxMethod<string>(
            pipe(
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((room) => {
                    return bidService.auctionReject.pipe(
                        tap((auctionRejection) => patchState(store, { error: new Error(auctionRejection) }))
                    );    
                }),
            )
        ),
        enterAuction: rxMethod<string>(
            pipe(
                debounceTime(100),
                distinctUntilChanged(),
                tap(() => patchState(store, { bid: 0, ask: null, error: null, bidRejection: null })),
                switchMap((room) => {
                    return of(bidService.enterAuction(room));    
                })
            )
        ),
        placeBid: rxMethod<number>(
            pipe(
                debounceTime(100),
                distinctUntilChanged(),
                tap(() => patchState(store, { bidRejection: null })),
                switchMap((value) => {
                    return of(bidService.placeBid({ auctionId: store.auctionRoom(), value }))
                })
            )
        )
    })),
    withHooks({
        onInit({ auctionRoom, bid, setAsk, setError, setBidRejection, enterAuction, placeBid }) {
            setAsk(auctionRoom);
            setError(auctionRoom);
            setBidRejection(auctionRoom);
            enterAuction(auctionRoom);
            placeBid(bid);
        }
    })
)