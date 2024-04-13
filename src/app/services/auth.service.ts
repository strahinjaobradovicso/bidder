import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../interfaces/model/authModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl = environment.API_URL + '/users/signUp';
  logInUrl = environment.API_URL + '/auth/login';

  constructor(private http: HttpClient) { }

  signup(auth: AuthModel){
    return this.http.post(this.signUpUrl, auth);
  }

  login(auth: AuthModel){
    return this.http.post(this.logInUrl, auth);
  }
}
