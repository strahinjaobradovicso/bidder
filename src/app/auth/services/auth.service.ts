import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../../environments/environment';
import { AuthModel } from '../types/auth.interface';
import { TokenResponsePayload } from '../types/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl = environment.API_URLS.SIGNUP;
  logInUrl = environment.API_URLS.LOGIN;
  tokenKey = environment.TOKEN_STORAGE_KEY;

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

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    if(!token)
      return null;
    const decoded = jwtDecode(token);
    if(decoded.exp && decoded.exp * 1000 <= Date.now()){
      return null;
    }
    return token;
  }

  getTokenPayload() {
    const token = this.getToken();
    if(!token)
        return null;
    const decoded = jwtDecode<TokenResponsePayload>(token);
    return decoded;
  }
    
}
