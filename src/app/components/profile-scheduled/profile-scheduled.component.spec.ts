import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScheduledComponent } from './profile-scheduled.component';

describe('ProfileScheduledComponent', () => {
  let component: ProfileScheduledComponent;
  let fixture: ComponentFixture<ProfileScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileScheduledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
