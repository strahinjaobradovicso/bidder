import { Routes } from '@angular/router';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AuctionBiddingComponent } from './components/auction-bidding/auction-bidding.component';

export const routes: Routes = [
    { path: '', component: AuctionListComponent },
    { path: 'auction-details', component: AuctionDetailsComponent },
    { path: 'auction-bidding',  component: AuctionBiddingComponent }
];
