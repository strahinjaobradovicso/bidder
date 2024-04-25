import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViews } from '../../interfaces/render/profileRender';
import { AuctionQueryComponent } from '../auction-query/auction-query.component';
import { StoreComponent } from '../store/store.component';
import { NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenResponsePayload } from '../../interfaces/response/tokenResponse';
import { LogOutComponent } from '../log-out/log-out.component';

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
    this.token = authService.getToken();
  }
  setView(view: ProfileViews){
    this.view = view;
  }
}
