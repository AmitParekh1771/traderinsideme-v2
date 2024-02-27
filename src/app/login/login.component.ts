import { AppError } from './../services/app-error';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { BadRequestError } from '../services/bad-request-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthorized:boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submit(body: any) {
    this.auth.adminLogin(body)
      .subscribe( (res: boolean) => {
        if(res) {
          this.isAuthorized = true;
          this.router.navigate(['/admin/admin-list']);
        }
      }, (error: AppError) => {
        localStorage.removeItem('token');
        console.log(error);
        if(error instanceof BadRequestError) {
          this.isAuthorized = false;
          return;
        }
      });
  }

}
