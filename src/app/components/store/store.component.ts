import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ItemQueryComponent } from '../item-query/item-query.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProfileComponent, ItemQueryComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
