import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../interfaces/model/authModel';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl = environment.API_URLS.SIGNUP;
  logInUrl = environment.API_URLS.LOGIN;

  constructor(private http: HttpClient) { }

  signup(auth: AuthModel){
    return this.http.post(this.signUpUrl, auth).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 409){
          throw new Error('Name or email are in use');
        }
        else{
          throw new Error('Unknown error');
        }
      })
    )
  }

  login(auth: AuthModel){
    return this.http.post(this.logInUrl, auth).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 409){
          throw new Error('Bad credentials');
        }
        else{
          throw new Error('Unknown error');
        }
      })
    )
  }
}
