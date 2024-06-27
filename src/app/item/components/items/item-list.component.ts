import { Component, computed} from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { ItemService } from '../../services/item.service';
import { ItemQueryService } from '../../services/item-query.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { toSignalWithError } from '../../../core/util/signal';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, CommonModule, ErrorComponent, SearchComponent, PaginationComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
  providers: [ItemQueryService]
})
export class ItemListComponent {

  items = toSignalWithError(
    toObservable(this.itemQueryService.querySignal).pipe(
      switchMap((query) => {
        return this.itemService.getUsersItems(query);
      })
    )
  )
  totalRecords = computed(()=>{
    return this.items.value()?.count || 0;
  })

  itemsPerPage = computed(()=>{
    return this.itemQueryService.querySignal().itemsPerPage;
  })

  constructor(private itemService: ItemService, private itemQueryService: ItemQueryService){}


  searchUpdate(title: string){
    this.itemQueryService.setTitle(title);
  }

  pageUpdate(page: number){
    this.itemQueryService.setPage(page);
  }
}
