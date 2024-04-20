import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BrowserStorageService } from './browserstorage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  browserStorageService=inject(BrowserStorageService);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`,registerObj);
  }

  loginService(loginObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`,loginObj);
  }

  sendEmailService(email:string){
    return this.http.post<any>(`${apiUrls.authServiceApi}sendemail`,{email:email});
  }

  resetPasswordService(resetObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}resetpassword`,resetObj);
  }

  isLoggedIn(){
    return !!this.browserStorageService.get("user_id");
  }
}
