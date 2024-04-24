import { Routes } from '@angular/router';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { AuctionQueryComponent } from './components/auction-query/auction-query.component';
import { authGuard } from './auth-guard';
import { AuctionBidComponent } from './components/auction-bid/auction-bid.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: AuctionQueryComponent },
    { path: 'auction-details', component: AuctionDetailsComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'auction-bidding',  component: AuctionBidComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'profile/upload', component: AddItemComponent, canActivate: [authGuard] },
    { path: 'profile/schedule', component: CreateAuctionComponent, canActivate: [authGuard] },
];
