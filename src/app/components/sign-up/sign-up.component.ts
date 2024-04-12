import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AuthModel } from '../../interfaces/model/authModel';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  action = 'signup'

  signup(auth: AuthModel){
    console.log(auth);
  }
}
