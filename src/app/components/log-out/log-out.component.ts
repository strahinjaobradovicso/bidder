import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenResponsePayload } from '../../interfaces/response/tokenResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {

  token: TokenResponsePayload | null;
  
  constructor(private authService: AuthService, private router: Router) {
    this.token = authService.getTokenPayload();  
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['log-in']);
  }
}
