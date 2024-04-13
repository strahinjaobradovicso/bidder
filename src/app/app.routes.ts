import { Routes } from '@angular/router';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionBiddingComponent } from './components/auction-bidding/auction-bidding.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreComponent } from './components/store/store.component';

export const routes: Routes = [
    { path: '', component: AuctionListComponent },
    { path: 'auction-details', component: AuctionDetailsComponent },
    { path: 'auction-bidding',  component: AuctionBiddingComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'profile/store', component: StoreComponent },
];
