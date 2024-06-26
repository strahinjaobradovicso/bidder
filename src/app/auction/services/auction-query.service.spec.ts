import { TestBed } from '@angular/core/testing';

import { AuctionQueryService } from './auction-query.service';

describe('AuctionQueryService', () => {
  let service: AuctionQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
