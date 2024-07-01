import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { ItemsState } from "../types/itemsState.interface";
import { inject } from "@angular/core";
import { ItemService } from "../services/item.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ItemQuery } from "../types/itemQuery.interface";
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";

const initialState: ItemsState = {
    items: {
        count: 0,
        rows: []
    },
    isLoading: false,
    error: null,
    query: {
        page: 1,
        itemsPerPage: 4,
        title: undefined,
    },
    paginationReset: {
        index: 1,
        toLoad: false       
    }
}

export const ItemsStore = signalStore(
    withState(initialState),
    withMethods((store, itemService = inject(ItemService)) => ({
        setQueryTitle(title: string) {
            patchState(store, (state) => ({ query: { ...state.query, title, page: 1 }, paginationReset: { index:1, toLoad:false} }))
        },
        setQueryPage(page: number) {
            patchState(store, (state) => ({ query: { ...state.query, page } }))
        },
        loadItems: rxMethod<ItemQuery>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((query) => itemService.getUsersItems(query).pipe(
                    tap({
                        next: (items) => patchState(store, { items }),
                        error: (error) => patchState(store, { error }),
                        finalize: () => patchState(store, { isLoading: false })
                    })
                ))
            )
        )
    })),
    withHooks({
        onInit({ loadItems, query }) {
            loadItems(query);
        }
    })
)