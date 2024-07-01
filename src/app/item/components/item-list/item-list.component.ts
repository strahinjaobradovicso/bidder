import { Component, input} from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { ItemModel } from '../../types/itemModel.interface';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemComponent, CommonModule, ErrorComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {

  items = input.required<ItemModel[]>();
  loading = input.required<boolean>();
  error = input.required<Error | null>();

}
