import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWonComponent } from './profile-won.component';

describe('ProfileWonComponent', () => {
  let component: ProfileWonComponent;
  let fixture: ComponentFixture<ProfileWonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
