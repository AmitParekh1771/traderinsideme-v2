
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../app-error';
import { BadRequestError } from '../bad-request-error';
import { NotFoundError } from '../not-found-error';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAdmins() {
    return this.http.get(`${this.url}/admins/`, this.requestOptions)
      .pipe(catchError(this.handleErrors));
  }

  getMe() {
    return this.http.get(`${this.url}/admins/me/`, this.requestOptions)
      .pipe(catchError(this.handleErrors));
  }

  postAdmin(body: any) {
    return this.http.post(`${this.url}/admins/`, body, this.requestOptions)
      .pipe(catchError(this.handleErrors));
  }

  deleteAdmin(id: any) {
    return this.http.delete(`${this.url}/admins/${id}/`, this.requestOptions)
      .pipe(catchError(this.handleErrors));
  }

  private token = localStorage.getItem('token');
  private requestOptions = {
    headers: new HttpHeaders({'x-auth-token': this.token})
  }

  
  private handleErrors(err: Response) {
    if(err.status === 400) 
      return throwError(new BadRequestError(err));
    else if(err.status === 404)
      return throwError(new NotFoundError());
    return throwError(new AppError(err));
  }

}
