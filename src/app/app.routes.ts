import { Routes } from '@angular/router';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { AddItemComponent } from './item/components/add-item/add-item.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { AuctionDetailsComponent } from './auction/components/auction-details/auction-details.component';
import { CreateAuctionComponent } from './auction/components/create-auction/create-auction.component';
import { AuctionBidComponent } from './bid/components/auction-bid/auction-bid.component';
import { authGuard } from './core/guards/auth-guard';
import { stateGuard } from './core/guards/state-guard.guard';
import { environment } from '../environments/environment';
import { AuctionsComponent } from './auction/components/auctions/auctions.component';

export const routes: Routes = [
    { path: '', component: AuctionsComponent },
    { path: 'auction-details', component: AuctionDetailsComponent, canActivate: [stateGuard(environment.AUCTION_KEY_STATE)] },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'auction-bidding',  component: AuctionBidComponent, canActivate: [authGuard, stateGuard(environment.AUCTION_KEY_STATE)] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'profile/upload', component: AddItemComponent, canActivate: [authGuard] },
    { path: 'profile/schedule', component: CreateAuctionComponent, canActivate: [authGuard, stateGuard(environment.ITEM_KEY_STATE)] },
];
