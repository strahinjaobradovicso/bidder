import { Socket } from "ngx-socket-io";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

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