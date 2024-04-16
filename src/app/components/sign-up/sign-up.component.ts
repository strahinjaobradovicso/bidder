import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AuthModel } from '../../interfaces/model/authModel';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  action = 'signup'

  subscription?: Subscription;

  constructor(private router: Router, private authService: AuthService){}

  signup(auth: AuthModel){
    this.authService.signup(auth).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.router.navigate(['/log-in']);
      }
    })
  }
}
