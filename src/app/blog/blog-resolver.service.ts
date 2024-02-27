import { NotFoundError } from './../services/not-found-error';
import { BadRequestError } from 'src/app/services/bad-request-error';
import { AppError } from './../services/app-error';
import { catchError } from 'rxjs/operators';
import { ArticleService } from './../services/articles/article.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogResolverService implements Resolve<any> {

  constructor(private blogService: ArticleService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Observable<never>|any {
      return this.blogService.getBlog(route.paramMap.get('route'))
        .pipe(catchError(this.handleErrors));
    }
  
  private handleErrors(err: Response) {
    if(err.status === 400) 
      return throwError(new BadRequestError(err));
    else if(err.status === 404) {
      this.router.navigate(['not-found']);
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(err));
  }


}
