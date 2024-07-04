import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ItemQuery } from '../types/itemQuery.interface';
import { CreateItem } from '../types/itemCreate.interface';
import { PaginationResponse } from '../../shared/types/paginationResponse.interface';
import { ItemModel } from '../types/itemModel.interface';

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
        if(param == undefined)
          continue;
        httpParams = httpParams.set(key, param);
      }
    }
    const options = { params: httpParams };
    return this.http.get<PaginationResponse<ItemModel>>(this.apiUrl, options).pipe(
      map((res: PaginationResponse<ItemModel>) => {
        res.rows.forEach(item => {
          for (const imageModel of item.ImageModels) {
            imageModel.imageData = `${environment.API_URL}/${imageModel.imageData}`; 
          }
        });
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        throw new Error('Could not load data');
      })
    )
  }

  create(item: CreateItem){
    const formData = new FormData();
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const value = item[key as keyof CreateItem];
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
    return this.http.post(this.apiUrl, formData).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 400){
          throw new Error('Could not create item');
        }
        else{
          throw new Error('Unknown error');
        }
      })
    )
  }
}
