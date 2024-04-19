import { Routes } from '@angular/router';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionBiddingComponent } from './components/auction-bidding/auction-bidding.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreComponent } from './components/store/store.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { AuctionQueryComponent } from './components/auction-query/auction-query.component';
import { ProfileScheduledComponent } from './components/profile-scheduled/profile-scheduled.component';
import { ProfileWonComponent } from './components/profile-won/profile-won.component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', component: AuctionQueryComponent },
    { path: 'auction-details', component: AuctionDetailsComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'auction-bidding',  component: AuctionBiddingComponent, canActivate: [authGuard] },
    { path: 'profile/store', component: StoreComponent, canActivate: [authGuard] },
    { path: 'profile/store/add', component: AddItemComponent, canActivate: [authGuard] },
    { path: 'profile/auctions/create', component: CreateAuctionComponent, canActivate: [authGuard] },
    { path: 'profile/scheduled', component: ProfileScheduledComponent, canActivate: [authGuard] },
    { path: 'profile/won', component: ProfileWonComponent, canActivate: [authGuard] },
];
