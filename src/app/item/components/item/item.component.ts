import { Component, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from '../../types/itemModel.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  item = input.required<ItemModel>();

  constructor(private router: Router){}

  schedulePage(){
    this.router.navigate(['/profile/schedule'], {
      state: {
        [environment.ITEM_KEY_STATE]: this.item()
      }
    })
  }

}
