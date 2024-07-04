import { Routes } from '@angular/router';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { authGuard } from './core/guards/auth-guard';
import { stateGuard } from './core/guards/state-guard.guard';
import { environment } from '../environments/environment';
import { AuctionsComponent } from './auction/components/auctions/auctions.component';

export const routes: Routes = [
    { path: '', component: AuctionsComponent },
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { 
        path: 'auction-details',
        canActivate: [stateGuard(environment.AUCTION_KEY_STATE)], 
        loadComponent: () => import('./auction/components/auction-details/auction-details.component')
        .then(c => c.AuctionDetailsComponent) },
    { 
        path: 'auction-bidding',
        canActivate: [authGuard, stateGuard(environment.AUCTION_KEY_STATE)],
        loadComponent: () => import('./bid/components/auction-bid/auction-bid.component')
        .then(c => c.AuctionBidComponent) },
    { 
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () => import('./profile/routes')
        .then(r => r.profileRoutes) 
    }
];
