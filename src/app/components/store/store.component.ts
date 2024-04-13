import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ItemListComponent } from '../items/item-list.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProfileComponent, ItemListComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
