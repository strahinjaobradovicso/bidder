import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { NgStyle } from '@angular/common';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { CarouselComponent } from '../../../item/components/carousel/carousel.component';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { environment } from '../../../../environments/environment';
import { toUtc } from '../../../core/util/time';
import { CreateAuction } from '../../types/auctionCreate.interface';
import { AuctionService } from '../../services/auction.service';
import { ItemModel } from '../../../item/types/itemModel.interface';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    DatePickerComponent,
    AuctionListComponent,
    CarouselComponent,
    ErrorComponent
  ],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.css'
})
export class CreateAuctionComponent {

  item: ItemModel;
  startingBidForm: FormGroup;
  selectedHour = 12;
  selectedDate = new Date();
  inAdvanceDays = environment.BIDDING.START_IN_ADVANCE_DAYS;

  error: Error | null = null;

  constructor(private router: Router, private auctionService: AuctionService){
    this.item = this.router.getCurrentNavigation()!.extras.state!['item'] as ItemModel;
    this.startingBidForm = new FormGroup({
      startingBid: new FormControl(this.item.price/2,
        [Validators.required, Validators.min(0), Validators.max(this.item.price)]
      )
    })
  }

  dateValid(): boolean {
    let firstValidDate = new Date();
    firstValidDate.setDate(firstValidDate.getDate() + this.inAdvanceDays);
    let start = this.selectedDate;
    start.setHours(this.selectedHour);
    return start >= firstValidDate;
  }

  nextHour(){
    if(this.selectedHour < 23){
      this.selectedHour++;
    }
  }

  previousHour(){
    if(this.selectedHour > 0){
      this.selectedHour--;
    }
  }

  setDate(date: Date){
    this.selectedDate = date;
  }

  create(){
    this.error = null;
    if(!this.startingBidForm.valid){
      return;
    }
    if(!this.dateValid()){
      this.error = new Error(`the start must be at least ${this.inAdvanceDays} days in advance`);
      return;
    }
    const startingBid = this.startingBidForm.value.startingBid;

    const hour = this.selectedHour;
    this.selectedDate.setHours(hour);
    const startDate = toUtc(this.selectedDate);

    const auction: CreateAuction = {
      start: startDate,
      itemId: Number(this.item.id),
      startingBid: startingBid
    }
    this.auctionService.scheduleAuction(auction).subscribe({
      error: (e) => {
        this.error = e;
      },
      complete: () => {
        this.router.navigate(['/profile']);
      }
    })
  }

}
