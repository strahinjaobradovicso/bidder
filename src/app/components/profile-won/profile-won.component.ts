import { Component, OnInit } from '@angular/core';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { ProfileComponent } from '../profile/profile.component';
import { AuctionListComponent } from '../auction-list/auction-list.component';

@Component({
  selector: 'app-profile-won',
  standalone: true,
  imports: [ProfileComponent, AuctionListComponent],
  templateUrl: './profile-won.component.html',
  styleUrl: './profile-won.component.css'
})
export class ProfileWonComponent implements OnInit {

  token?: TokenResponsePayload;

  ngOnInit(): void {
    this.token = getDecoded();
  }
}
