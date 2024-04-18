import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ItemListComponent } from '../items/item-list.component';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { ItemQueryComponent } from '../item-query/item-query.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProfileComponent, ItemQueryComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  token?: TokenResponsePayload;

  ngOnInit(): void {
    this.token = getDecoded();
  }

}
