import { Component, effect, inject, input, viewChild } from '@angular/core';
import { AuctionsStore } from '../../store/auctions.store';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { ErrorComponent } from '../../../shared/components/error/error.component';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [AuctionListComponent, SearchComponent, PaginationComponent, ErrorComponent],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
  providers: [AuctionsStore]
})
export class AuctionsComponent {
  readonly store = inject(AuctionsStore);

  ownerId = input<number>();
  winnerId = input<number>();
  
  ownerId$ = toObservable(this.ownerId);
  winnerId$ = toObservable(this.winnerId);

  constructor() {
    this.store.setQueryOwner(this.ownerId$);
    this.store.setQueryWinner(this.winnerId$);
  }
}
