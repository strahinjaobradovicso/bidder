import { TestBed } from '@angular/core/testing';

import { ItemQueryService } from './item-query.service';

describe('ItemQueryService', () => {
  let service: ItemQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
