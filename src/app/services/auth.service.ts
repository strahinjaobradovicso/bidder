import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../interfaces/model/authModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl = environment.API_URLS.SIGNUP;
  logInUrl = environment.API_URLS.LOGIN;

  constructor(private http: HttpClient) { }

  signup(auth: AuthModel){
    return this.http.post(this.signUpUrl, auth);
  }

  login(auth: AuthModel){
    return this.http.post(this.logInUrl, auth);
  }
}
