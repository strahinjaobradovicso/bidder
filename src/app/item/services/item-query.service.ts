import { Injectable, signal } from '@angular/core';
import { ItemQuery } from '../types/itemQuery.interface';

export class ItemQueryService {

  querySignal = signal<ItemQuery>({
    title: undefined,
    page:1,
    itemsPerPage:2
  })


  setPage(page: number){
    this.querySignal.update((query) => {
      return {...query, page};
    })
  }

  setTitle(title: string){
    this.querySignal.update((query) => {
      return {...query, title, page: 1};
    })
  } 

}
