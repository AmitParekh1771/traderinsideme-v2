import { SpinnerService } from '../../spinner/spinner.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  emailPostUrl = environment.emailPostURL;
  constructor(private spinnerService: SpinnerService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted();
    setTimeout(() => this.spinnerService.resetSpinner(), 10000);
    return next.handle(req)
      .pipe(
        tap(
          event => {
            if(event instanceof HttpResponse)
              this.spinnerService.requestEnded();
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        )
      );
  }
}
