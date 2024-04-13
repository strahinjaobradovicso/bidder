import { Component, OnInit } from '@angular/core';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { ProfileComponent } from '../profile/profile.component';
import { AuctionListComponent } from '../auction-list/auction-list.component';

@Component({
  selector: 'app-profile-scheduled',
  standalone: true,
  imports: [ProfileComponent, AuctionListComponent],
  templateUrl: './profile-scheduled.component.html',
  styleUrl: './profile-scheduled.component.css'
})
export class ProfileScheduledComponent implements OnInit {

  token?: TokenResponsePayload;

  ngOnInit(): void {
    this.token = getDecoded();
  }
}
