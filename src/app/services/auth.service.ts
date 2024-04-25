import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../interfaces/model/authModel';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { TokenResponsePayload } from '../interfaces/response/tokenResponse';

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
        throw new Error('Unknown error');
      })
    )
  }

  login(auth: AuthModel){
    return this.http.post(this.logInUrl, auth).pipe(
      tap({
        next: (v:any) => {
          localStorage.setItem(environment.TOKEN_STORAGE_KEY, v.jwt);
        }
      }),
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

  logout(){
    localStorage.clear();
  }

  getToken(){
    const token = localStorage.getItem(environment.TOKEN_STORAGE_KEY);
    if(!token)
        return null;
    const decoded = jwtDecode(token) as TokenResponsePayload;
    if(decoded.exp && decoded.exp * 1000 <= Date.now()){
        return null;
    }
    return decoded;
  }
    
}
