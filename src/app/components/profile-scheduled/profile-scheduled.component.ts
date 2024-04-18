import { Component, OnInit } from '@angular/core';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { AuctionQueryComponent } from '../auction-query/auction-query.component';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-profile-scheduled',
  standalone: true,
  imports: [AuctionQueryComponent, ProfileComponent],
  templateUrl: './profile-scheduled.component.html',
  styleUrl: './profile-scheduled.component.css'
})
export class ProfileScheduledComponent implements OnInit {

  token?: TokenResponsePayload;
  
  ngOnInit(): void {
    this.token = getDecoded();
  }


}
