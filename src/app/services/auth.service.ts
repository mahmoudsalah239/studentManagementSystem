import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiRoutes } from '../core/routers/ApiRoutes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(this.getToken() != null);
  private baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}
  Login(data:any):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${ApiRoutes.account.login}`,data);
  }
  Register(data:any) {
    return this._HttpClient.post(`${this.baseUrl}${ApiRoutes.account.register}`,data);

  }
  saveToken(token: string): void {
    localStorage.setItem('Token',token);
    this.isLoggedIn.next(true);
  }

  getToken(){
    return localStorage.getItem('Token');
  }

  IsAuthenticated(){
    if(this.getToken() != null){
      this.isLoggedIn.next(true);
      return true;
    }
    else{
      this.isLoggedIn.next(false);
      return false;
    }
  }

  LogOut(){
    this.isLoggedIn.next(false); 
   localStorage.removeItem('Token');
  }
  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}
