import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenResponsePayload } from '../../interfaces/response/tokenResponse';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {

  token: TokenResponsePayload | null;
  
  constructor(private authService: AuthService) {
    this.token = authService.getToken();  
  }

  logout(){
    this.authService.logout();
  }
}
