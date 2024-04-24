import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AuthModel } from '../../interfaces/model/authModel';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [AuthComponent, ErrorComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  action = 'login'
  error: Error | null = null;

  constructor(private router: Router, private authService: AuthService){}

  login(auth: AuthModel){
    this.authService.login(auth).subscribe({
      error: (err) => {
        this.error = err;
      },
      next: (v:any) => {
        localStorage.setItem(environment.TOKEN_STORAGE_KEY, v.jwt);
        this.router.navigate(['/profile/store']);
      }
    })
  }
}
