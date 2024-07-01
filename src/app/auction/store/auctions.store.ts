import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { AuctionsState } from "../types/auctionsState.interface";
import { AuctionQuery } from "../types/auctionQuery.inteface";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { Observable, debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { AuctionService } from "../services/auction.service";

const initialState: AuctionsState = {
    auctions: {
        count: 0,
        rows: []
    },
    isLoading: false,
    error: null,
    query: {
        page: 1,
        itemsPerPage: 4,
        itemTitle: undefined,
        itemOwner: undefined,
        auctionWinner: undefined,
        date: undefined,
        status: undefined
    },
    paginationReset: {
        index: 1,
        toLoad: false       
    }
}

export const AuctionsStore = signalStore(
    withState(initialState),
    withMethods((store, auctionService = inject(AuctionService)) => ({
        setQueryTitle(itemTitle: string) {
            patchState(store, (state) => ({ query: {...state.query, itemTitle, page: 1 }, paginationReset: { index:1,toLoad:false} }));
        },
        setQueryPage(page: number) {
            patchState(store, (state) => ({ query: {...state.query, page }}));
        },
        setQueryWinner(winnerId$: Observable<number | undefined>) {
            winnerId$.subscribe((v) => {
                patchState(store, (state) => ({ query: {...state.query, auctionWinner: v }, paginationReset: { index:1,toLoad:false} }));
            })
        },
        setQueryOwner(ownerId$: Observable<number | undefined>) {
            ownerId$.subscribe((v) => {
                patchState(store, (state) => ({ query: {...state.query, itemOwner: v }, paginationReset: { index:1,toLoad:false} }));
            })
        },
        loadAuctions: rxMethod<AuctionQuery>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((query) => auctionService.getAuctions(query).pipe(
                    tap({
                        next: (auctions) => patchState(store, { auctions }),
                        error: (error) => patchState(store, {error, auctions: { count: 0, rows: [] } }),
                        finalize: () => patchState(store, { isLoading: false }),
                    })
                ))
            )
        )
    })),
    withHooks({
        onInit({ loadAuctions, query }) {
            loadAuctions(query);
        }
    })
)