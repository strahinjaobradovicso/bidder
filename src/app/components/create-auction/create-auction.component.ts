import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from '../../interfaces/model/itemModel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toUtc } from '../../util/time';
import { AuctionService } from '../../services/auction.service';
import { CreateAuction } from '../../interfaces/request/createAuction';
import { NgStyle } from '@angular/common';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, DatePickerComponent, AuctionListComponent, CarouselComponent],
  templateUrl: './create-auction.component.html',
  styleUrl: './create-auction.component.css'
})
export class CreateAuctionComponent implements OnInit {

  item: ItemModel;
  startingBidForm!: FormGroup;
  selectedHour = 12;
  selectedDate = new Date();

  constructor(private router: Router, private auctionService: AuctionService){
    this.item = this.router.getCurrentNavigation()!.extras.state!['item'] as ItemModel;
  }

  ngOnInit(): void {
    this.startingBidForm = new FormGroup({
      startingBid: new FormControl(this.item.price/2,
        Validators.required
      )
    })
  }

  inputValid(): boolean {
    if(!this.startingBidForm.valid)
      return false;

    const startingBid = this.startingBidForm.value.startingBid;
    if(startingBid > this.item.price){
      return false;
    }
    if(!this.dateValid())
      return false;

    return true;
  }

  dateValid(): boolean {
    let firstValidDate = new Date();
    firstValidDate.setDate(firstValidDate.getDate() + 1);
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

    if(!this.inputValid()){
      console.log('starting bid not valid');
      return;
    }

    if(!this.dateValid()){
      console.log('date not valid');
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
        console.log(e);
      },
      next: (v) => {
        console.log(v);
      }
    })
  }

}
