import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthModel } from '../../types/auth.interface';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  action = input.required<string>();

  formSubmit = output<AuthModel>();

  authForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ]),
    email: new FormControl(null, [
      Validators.required, Validators.email
    ])
  });

  onSubmit(){
    if(this.authForm.valid){
      const auth: AuthModel = {
        username: this.authForm.value.username!,
        password: this.authForm.value.password!,
        email: this.authForm.value.email!
      }
      this.formSubmit.emit(auth);
    }
  }

}
