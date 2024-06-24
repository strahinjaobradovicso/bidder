import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auction-bidding-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auction-bidding-form.component.html',
  styleUrl: './auction-bidding-form.component.css'
})
export class AuctionBiddingFormComponent implements OnChanges {

  bid = output<number>();

  askingBid = input.required<number>();

  overbidForm = new FormGroup({
    overbid: new FormControl(0, [
      Validators.required, Validators.min(0)
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.overbidForm.controls['overbid'].setValue(this.askingBid());
    this.overbidForm.setValidators([Validators.required, Validators.min(this.askingBid())]);
  }

  onOverBid(){
    const overBid = this.overbidForm.value.overbid;
    if(this.overbidForm.valid && overBid){
      this.bid.emit(overBid);
    }
  }

  onBid(){
    this.bid.emit(this.askingBid());
  }
}
