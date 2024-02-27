import { AdminService } from '../services/admin/admin.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('overlay-fade', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('0.2s 0s ease-out')
      ]),
      transition(':leave', [
        animate('0.2s 0s ease-in', style({ opacity: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  
  isActive = false;
  adminInfo = { name: "", email: "", isHead: false };
  isHead = false;

  constructor(
    private router: Router,
    private admin: AdminService) { }

  ngOnInit(): void {
    this.admin.getMe()
      .subscribe(
        (res: any) => {
          this.adminInfo = res;
          this.isHead = res.isHead;
        },
        err => console.log(err)
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}