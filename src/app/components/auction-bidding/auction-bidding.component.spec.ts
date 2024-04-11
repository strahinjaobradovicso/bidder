import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBiddingComponent } from './auction-bidding.component';

describe('AuctionBiddingComponent', () => {
  let component: AuctionBiddingComponent;
  let fixture: ComponentFixture<AuctionBiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionBiddingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuctionBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
