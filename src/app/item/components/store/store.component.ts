import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterLink, ItemsComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
