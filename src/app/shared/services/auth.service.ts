import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  register(newUser: { 
    email: string, first_name: string, last_name: string, password: string 
  }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/api/user/register/`, newUser)
      .pipe(
        mapTo(true),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      );
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/api/token/`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          console.log(error);
          return of(false);
        }));
  }

  logout() {
    return this.http.post<any>(`${config.apiUrl}/api/user/logout/blacklist/`, {
      'refresh': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.doLogoutUser();
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}/api/token/refresh/`, {
      'refresh': this.getRefreshToken()
    }).pipe(
      tap((tokens: Tokens) => this.storeTokens(tokens)),
      mapTo(true),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}