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
    httpParams = httpParams.set('page', query.page);
    httpParams = httpParams.set('itemsPerPage', query.itemsPerPage);
    if(query.date){
      httpParams = httpParams.set('date', query.date.toISOString());
    }

    if(query.itemTitle){
      httpParams = httpParams.set('itemTitle', query.itemTitle);
    }
    if(query.itemOwner){
      httpParams = httpParams.set('itemOwner', query.itemOwner);
    }
    if(query.auctionWinner){
      httpParams = httpParams.set('auctionWinner', query.auctionWinner);
    }
    if(query.status){
      httpParams = httpParams.set('status', query.status);
    }

    const options = { params: httpParams };
    return this.http.get<PaginationResponse<AuctionModel>>(this.apiUrl, options);
    
  }
}
