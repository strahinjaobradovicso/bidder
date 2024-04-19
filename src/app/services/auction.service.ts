import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionQuery } from '../interfaces/query/auctionQuery';
import { Observable, catchError } from 'rxjs';
import { AuctionModel } from '../interfaces/model/auctionModel';
import { environment } from '../../environments/environment';
import { PaginationResponse } from '../interfaces/response/paginationResponse';
import { CreateAuction } from '../interfaces/request/createAuction';
import { toUtc } from '../util/time';

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
