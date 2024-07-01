import { Component, inject } from '@angular/core';
import { ItemsStore } from '../../store/items.store';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [SearchComponent, PaginationComponent, ItemListComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
  providers: [ItemsStore]
})
export class ItemsComponent {
  store = inject(ItemsStore)
}
