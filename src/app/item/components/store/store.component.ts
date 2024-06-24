import { Component } from '@angular/core';
import { ItemQueryComponent } from '../item-query/item-query.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterLink, ItemQueryComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
