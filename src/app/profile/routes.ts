import { Routes } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { AddItemComponent } from "../item/components/add-item/add-item.component";
import { CreateAuctionComponent } from "../auction/components/create-auction/create-auction.component";
import { stateGuard } from "../core/guards/state-guard.guard";
import { environment } from "../../environments/environment";

export const profileRoutes: Routes = [
    { path: '', component: ProfileComponent },
    { path: 'upload', component: AddItemComponent },
    { path: 'schedule', canActivate: [stateGuard(environment.ITEM_KEY_STATE)] ,component: CreateAuctionComponent }
]