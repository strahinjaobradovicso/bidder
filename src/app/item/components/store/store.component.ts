import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemListComponent } from '../items/item-list.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterLink, ItemListComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
