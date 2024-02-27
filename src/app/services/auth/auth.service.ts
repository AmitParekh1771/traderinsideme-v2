import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AppError } from '../app-error';
import { BadRequestError } from '../bad-request-error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = environment.apiURL;

  constructor(private http: HttpClient) { }

  adminLogin(body: Object) {
    return this.http.post(`${this.url}/auth/`, body)
      .pipe(
        catchError((err: Response) => {
          if(err.status === 400) {
            return throwError(new BadRequestError());
          }
          return throwError(new AppError(err));
        }),
        map((res:any) => {
          if(res && res.token) {
            localStorage.setItem('token', res.token);
            return true;
          }
          else
            return false;
        })
      );
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(!token) return false;
    return true;
  }

  verifyToken() {
    let token = localStorage.getItem('token');
    if(!token)
      token='';
    let requestOptions = {
      headers: new HttpHeaders({'x-auth-token': token}), 
    };
    return this.http.get(`${this.url}/admins/me/`, requestOptions);
  }

}
