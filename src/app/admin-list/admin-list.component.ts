import { AppError } from './../services/app-error';
import { AdminService } from './../services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { BadRequestError } from './../services/bad-request-error';

@Component({
  selector: 'admin-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  isActive = false;
  admins = [];
  myinfo:Object;
  constructor(private admin: AdminService) { }

  ngOnInit(): void {
    this.admin.getAdmins()
      .subscribe(
        (res: Object[]) => this.admins = res,
        (err: AppError) => console.log(err.originalError)
      );
  }

  getMe() {
    this.admin.getMe()
      .subscribe(
        (res: Object) => this.myinfo = res,
        (err: AppError) => console.log(err.originalError)
      );
  }

  postAdmin(body: Object) {
    this.admin.postAdmin(body)
      .subscribe(
        (res) => this.admins.push(res),
        (err: AppError) => console.log(err.originalError)
      );
  }

  deleteAdmin(id: string) {
    let index = this.admins.findIndex(x => x._id === id);
    if(this.admins[index].isHead) {
      alert('Admin cannot be removed.')
      return;
    }
    this.admin.deleteAdmin(id)
      .subscribe(
        (res) => {
          console.log(res);
          this.admins.splice(index, 1);
        },
        (err: AppError) => console.log(err.originalError)
      );
  }

  addAdmin(body: any) {
    if(!body.isHead) body.isHead = false;
    this.isActive = false;
    console.log(body);
    this.postAdmin(body);
  }


}
