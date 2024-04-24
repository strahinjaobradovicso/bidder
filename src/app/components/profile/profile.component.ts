import { Component, OnInit } from '@angular/core';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { Router } from '@angular/router';
import { ProfileViews } from '../../interfaces/render/profileRender';
import { AuctionQueryComponent } from '../auction-query/auction-query.component';
import { StoreComponent } from '../store/store.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AuctionQueryComponent, StoreComponent, NgStyle],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  token?: TokenResponsePayload;
  store = ProfileViews.Store;
  schedules = ProfileViews.Schedules;
  wins = ProfileViews.Wins;

  view: ProfileViews = ProfileViews.Store;

  constructor(private router: Router){ }
  
  ngOnInit(): void {
    this.token = getDecoded();
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  setView(view: ProfileViews){
    this.view = view;
  }

}
