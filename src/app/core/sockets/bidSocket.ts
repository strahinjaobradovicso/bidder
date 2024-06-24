import { Socket } from "ngx-socket-io";
import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BidSocket extends Socket {

    constructor(private authService: AuthService){
        super({
            url: environment.SOCKET.BIDDING_NAMESPACE, 
            options: {
                extraHeaders: {
                    Authorization: `${environment.AUTH_HEADER_KEY}: ${authService.getToken()}` 
                }
            }  
        });
    }
}