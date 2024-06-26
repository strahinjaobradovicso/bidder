import { Component, Signal, computed, effect, input} from '@angular/core';
import { AuctionComponent } from '../auction/auction.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { AuctionService } from '../../services/auction.service';
import { AuctionQueryService } from '../../services/auction-query.service';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { count, switchMap } from 'rxjs';
import { AuctionQuery } from '../../types/auctionQuery.inteface';
import { toSignalWithError } from '../../../core/util/signal';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [AuctionComponent, CommonModule, ErrorComponent, SearchComponent, PaginationComponent],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.css',
  providers: [AuctionQueryService]
})
export class AuctionListComponent {

  winnerId = input<number>();
  ownerId = input<number>();

  query = computed((): AuctionQuery =>{
    const querySignal = this.auctionQueryService.querySignal();
    const winnerId = this.winnerId();
    const ownerId = this.ownerId();
    return {
      ...querySignal,
      auctionWinner: winnerId,
      itemOwner: ownerId
    }
  })


  auctions = toSignalWithError(
    toObservable(this.query).pipe(
      switchMap((query: AuctionQuery) => {
        return this.auctionService.getAuctions(query)
      })
    )
  )

  totalRecords = computed(()=>{
    return this.auctions.value()?.count || 0;
  })

  recordsPerPage = computed(()=>{
    return this.auctionQueryService.querySignal().itemsPerPage;
  })

  constructor(private auctionService: AuctionService, private auctionQueryService: AuctionQueryService){
    console.log(this.auctionQueryService.querySignal());
  }


  searchUpdate(itemTitle: string){
    this.auctionQueryService.setItemTitle(itemTitle);
  }

  pageUpdate(page: number){
    this.auctionQueryService.setPage(page);
  }

}
