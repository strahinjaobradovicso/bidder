import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../../shared/components/error/error.component';
import { AuthModel } from '../../types/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthComponent, ErrorComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  action = 'signup';
  error: Error | null = null;

  constructor(private router: Router, private authService: AuthService){}

  signup(auth: AuthModel){

    this.authService.signup(auth).subscribe({
      error: (e) => {
        this.error = e;
      },
      complete: () => {
        this.router.navigate(['/log-in']);
      }
    })
  }
}
