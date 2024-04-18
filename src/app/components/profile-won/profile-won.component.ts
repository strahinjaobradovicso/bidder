import { Component, OnInit } from '@angular/core';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { AuctionQueryComponent } from '../auction-query/auction-query.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-profile-won',
  standalone: true,
  imports: [AuctionQueryComponent, ProfileComponent],
  templateUrl: './profile-won.component.html',
  styleUrl: './profile-won.component.css'
})
export class ProfileWonComponent implements OnInit {

  token?: TokenResponsePayload;
  
  ngOnInit(): void {
    this.token = getDecoded();
  }
}
