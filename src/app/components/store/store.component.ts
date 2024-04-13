import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ItemListComponent } from '../items/item-list.component';
import { TokenResponsePayload, getDecoded } from '../../util/token';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProfileComponent, ItemListComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  token?: TokenResponsePayload;

  ngOnInit(): void {
    this.token = getDecoded();
  }

}
