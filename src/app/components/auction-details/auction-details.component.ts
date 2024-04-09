import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from '../../interfaces/model/auctionModel';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [],
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {

  auction: any;
  constructor(private router: Router){
    this.auction = this.router.getCurrentNavigation()!.extras.info;
  }

}
