import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQueryComponent } from './item-query.component';

describe('ItemQueryComponent', () => {
  let component: ItemQueryComponent;
  let fixture: ComponentFixture<ItemQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
