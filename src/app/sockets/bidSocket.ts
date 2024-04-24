import { Socket, SocketIoConfig } from "ngx-socket-io";
import { environment } from "../../environments/environment";
import { getDecoded } from "../util/token";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BidSocket extends Socket {

    constructor(){
        super({
            url: environment.SOCKET.BIDDING_NAMESPACE, 
            options: {
                extraHeaders: {
                    Authorization: `${environment.AUTH_HEADER_KEY}: ${localStorage.getItem(environment.TOKEN_STORAGE_KEY)}` 
                }
            }  
        });
    }
}