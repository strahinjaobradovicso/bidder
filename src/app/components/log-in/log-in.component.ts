import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AuthModel } from '../../interfaces/model/authModel';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  action = 'login'

  constructor(private router: Router, private authService: AuthService){}

  login(auth: AuthModel){
    this.authService.login(auth).subscribe({
      error: (e) => {
        console.log(e);
      },
      next: (v:any) => {
        localStorage.setItem(environment.TOKEN_STORAGE_KEY, v.jwt);
        this.router.navigate(['/']);
      }
    })
  }
}
