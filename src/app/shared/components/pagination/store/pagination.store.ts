import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { computed } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationStateInteface } from "../types/paginationState.interface";

const initialState: PaginationStateInteface = {
    totalRecords: 0,
    recordsPerPage: 0,
    page: {
        index: 1,
        toLoad: false
    }
}

export const PaginationStore = signalStore(
    withState(initialState),
    withComputed(({totalRecords, recordsPerPage, page})=>({
        lastPage: computed(() => {
            return Math.ceil(totalRecords() / recordsPerPage())
        }),
        pageList: computed(() => {
            const pages = [];
            let lastPage = Math.ceil(totalRecords() / recordsPerPage());
            pages.push(1);
            for (let before = page().index - 3; before < page().index; before++) {
                if(before > 1)
                    pages.push(before);
            }
            if(page().index > 1 && page().index < lastPage)
                pages.push(page().index);
            for (let after = page().index + 1; after <= page().index + 3; after++) {
                if(after < lastPage){
                    pages.push(after);
                }      
            }
            if(lastPage > 1)
                pages.push(lastPage);

            return pages;
        })
    
    })),
    withMethods((store) => ({
        setTotalRecords(totalRecords$: Observable<number>){
            totalRecords$.subscribe((v) => {
                patchState(store, { totalRecords: v })
            });
        },
        setRecordsPerPage(recordsPerPage$: Observable<number>){
            recordsPerPage$.subscribe((v) => {
                patchState(store, { recordsPerPage: v })
            });
        },
        setPage(page: number){
            patchState(store, { page: {index: page, toLoad:true} })
        },
        previousPage(){
            patchState(store, (state) => ({ page: {index: state.page.index - 1, toLoad:true}}))
        },
        nextPage(){
            patchState(store, (state) => ({ page: {index: state.page.index + 1, toLoad:true}}))

        },
        setPaginationReset(reset$: Observable<{index: number, toLoad: boolean}>){
            reset$.subscribe((v) => {
                patchState(store, { page: v })
            });
        },
        
    })),
)