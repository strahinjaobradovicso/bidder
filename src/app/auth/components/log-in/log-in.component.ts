import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { AuthModel } from '../../types/auth.interface';
import { AuthService } from '../../services/auth.service';

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
        this.router.navigate(['/profile']);
      }
    })
  }
}
