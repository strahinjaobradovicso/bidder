import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuctionQuery } from '../interfaces/query/auctionQuery';
import { Observable } from 'rxjs';
import { AuctionModel } from '../interfaces/model/auctionModel';
import { environment } from '../../environments/environment';
import { PaginationResponse } from '../interfaces/response/paginationResponse';

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
          param = param.toISOString();
        }
        httpParams = httpParams.set(key, param);
      }
    }
    const options = { params: httpParams };
    return this.http.get<PaginationResponse<AuctionModel>>(this.apiUrl, options);
    
  }
}
