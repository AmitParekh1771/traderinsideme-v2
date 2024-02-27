import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AppError } from '../app-error';
import { BadRequestError } from '../bad-request-error';
import { NotFoundError } from '../not-found-error';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryUploadService {

  constructor(private http: HttpClient) { }

  uploadImage(data: any) {
    return this.http.post("https://api.cloudinary.com/v1_1/traderinsideme/image/upload", data, {headers:null})
      .pipe(catchError(this.handleErrors));
  }
  
  private handleErrors(err: Response) {
    if(err.status === 400) 
      return throwError(new BadRequestError(err));
    else if(err.status === 404)
      return throwError(new NotFoundError());
    return throwError(new AppError(err));
  }

}
