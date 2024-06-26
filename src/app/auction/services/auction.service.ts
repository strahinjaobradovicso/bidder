import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuctionQuery } from '../types/auctionQuery.inteface';
import { toLocal, toUtc } from '../../core/util/time';
import { CreateAuction } from '../types/auctionCreate.interface';
import { PaginationResponse } from '../../shared/types/paginationResponse.interface';
import { AuctionModel } from '../types/auctionModel.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  apiUrl: string = environment.API_URLS.AUCTION;


  constructor(private http: HttpClient) { }

  getAuctions(query: AuctionQuery): Observable<PaginationResponse<AuctionModel>> {
    let httpParams = new HttpParams();
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        let param = query[key as keyof AuctionQuery];
        if(!param)
          continue;
        if(param instanceof Date){
          param = toUtc(param);
          param = param.toISOString();
        }
        httpParams = httpParams.set(key, param);
      }
    }
    const options = { params: httpParams };
    return this.http.get<PaginationResponse<AuctionModel>>(this.apiUrl, options).pipe(
      map((res:PaginationResponse<AuctionModel>) => {
        for (const auction of res.rows) {
          for (const imageModel of auction.ItemModel.ImageModels) {
              imageModel.imageData = `${environment.API_URL}/${imageModel.imageData}`; 
          }
          auction.start = toLocal(auction.start.toString());
        }
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        throw new Error('Could not load data');
      })
    )
  }

  scheduleAuction(auction: CreateAuction){
    return this.http.post(this.apiUrl, auction).pipe(
      catchError((err: HttpErrorResponse) => {
        throw new Error('Could not schedule an auction');
      })
    )
  }

}
