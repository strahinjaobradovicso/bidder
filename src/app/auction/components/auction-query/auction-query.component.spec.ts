import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionQueryComponent } from './auction-query.component';

describe('AuctionQueryComponent', () => {
  let component: AuctionQueryComponent;
  let fixture: ComponentFixture<AuctionQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuctionQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
