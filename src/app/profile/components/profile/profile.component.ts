import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionQueryComponent } from '../../../auction/components/auction-query/auction-query.component';
import { StoreComponent } from '../../../item/components/store/store.component';
import { NgStyle } from '@angular/common';
import { ProfileViews } from '../../types/profileViews.enum';
import { AuthService } from '../../../auth/services/auth.service';
import { LogOutComponent } from '../../../auth/components/log-out/log-out.component';
import { TokenResponsePayload } from '../../../auth/types/token.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AuctionQueryComponent, StoreComponent, NgStyle, LogOutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  token: TokenResponsePayload | null;
  store = ProfileViews.Store;
  schedules = ProfileViews.Schedules;
  wins = ProfileViews.Wins;

  view: ProfileViews = ProfileViews.Store;

  constructor(private router: Router, private authService: AuthService){ 
    this.token = authService.getTokenPayload();
  }
  setView(view: ProfileViews){
    this.view = view;
  }
}
