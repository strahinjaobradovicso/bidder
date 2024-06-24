import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBiddingFormComponent } from './auction-bidding-form.component';

describe('AuctionBiddingFormComponent', () => {
  let component: AuctionBiddingFormComponent;
  let fixture: ComponentFixture<AuctionBiddingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionBiddingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuctionBiddingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
