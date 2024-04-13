import { Component, OnInit, input } from '@angular/core';
import { ItemModel } from '../../interfaces/model/itemModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {

  item = input.required<ItemModel>();

  constructor(private router: Router){}

  ngOnInit(): void {
    this.item().imageUrls = []
  }

  schedulePage(){

  }

}
