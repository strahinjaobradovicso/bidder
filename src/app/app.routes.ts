import { Routes } from '@angular/router';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionBiddingComponent } from './components/auction-bidding/auction-bidding.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreComponent } from './components/store/store.component';
import { ProfileScheduledComponent } from './components/profile-scheduled/profile-scheduled.component';
import { ProfileWonComponent } from './components/profile-won/profile-won.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';

export const routes: Routes = [
    { path: '', component: AuctionListComponent },
    { path: 'auction-details', component: AuctionDetailsComponent },
    { path: 'auction-bidding',  component: AuctionBiddingComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'profile/store', component: StoreComponent },
    { path: 'profile/scheduled', component: ProfileScheduledComponent },
    { path: 'profile/won', component: ProfileWonComponent },
    { path: 'profile/store/add', component: AddItemComponent },
    { path: 'profile/auctions/create', component: CreateAuctionComponent },
];
