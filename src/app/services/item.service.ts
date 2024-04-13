import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ItemQuery } from '../interfaces/query/itemQuery';
import { ItemModel } from '../interfaces/model/itemModel';
import { PaginationResponse } from '../interfaces/response/paginationResponse';
import { CreateItem } from '../interfaces/request/createItem';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl = environment.API_URLS.ITEM;

  constructor(private http: HttpClient) { }

  getUsersItems(query: ItemQuery){
    let httpParams = new HttpParams();
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const param = query[key as keyof ItemQuery];
        if(!param)
          continue;
        httpParams = httpParams.set(key, param);
      }
    }
    const options = { params: httpParams };
    return this.http.get<PaginationResponse<ItemModel>>(this.apiUrl, options);
  }

  create(item: CreateItem){
    const formData = new FormData();
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key as keyof CreateItem];
        if(!value){
          continue;
        }
        if(Array.isArray(value)){
          for (const file of value) {
            formData.append('file', file);
          }
        }
        else {
          formData.append(key, value);
        }
      }
    }
    return this.http.post(this.apiUrl, formData);
  }
}
