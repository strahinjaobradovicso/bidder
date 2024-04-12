import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { AuthModel } from '../../interfaces/model/authModel';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  action = 'login'

  login(auth: AuthModel){
    console.log(auth);
  }
}
