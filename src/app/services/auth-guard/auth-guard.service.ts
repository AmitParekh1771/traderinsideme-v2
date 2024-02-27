import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs'
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.verifyToken().pipe(
      catchError((err: Response) => {
        this.router.navigate(['login']);
        return of(false);
      }),
      map((res:any) => {
        return true;
      })
    );
  }

}
