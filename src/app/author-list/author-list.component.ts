
import { CloudinaryUploadService } from './../services/cloudinary-upload/cloudinary-upload.service';
import { transition, animate, trigger, style, state } from '@angular/animations';
import { AppError } from './../services/app-error';
import { AuthorService } from './../services/author/author.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'admin-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
  animations: [
    trigger('top-down', [
      state('*', style({ opacity: 1, top: '20px' })),
      state('void', style({ opacity: 0, top: '-100px' })),
      transition(':enter', [
        animate('0.2s ease-out')
      ]),
      transition(':leave', [
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class AuthorListComponent implements OnInit {

  isActive = false;
  update = false;
  file: File = null;
  fileName = '';
  showClipboardMessage = false;
  updateId = '';
  authors = [];
  authorInfo:any = {
    name: '',
    image: '',
    about: '',
    socialMedia: {
      linkedin: '',
      instagram: '',
      facebook: '',
      twitter: ''
    }
  };
  emptyInfo = this.authorInfo;

  constructor(
    private author: AuthorService,
    private clipboard: Clipboard,
    private uploadService: CloudinaryUploadService) { }

  ngOnInit(): void {
    this.author.getAuthors()
      .subscribe(
        (res: Object[]) => this.authors = res,
        (err: AppError) => console.log(err)
      );
  }

  getAuthor(id: string) {
    this.author.getAuthor(id)
      .subscribe(
        (res: Object) => this.authorInfo = res,
        (err: AppError) => console.log(err)
      );
  }

  postAuthor(body: Object) {
    this.author.postAuthor(body)
      .subscribe(
        (res: Object) => this.authors.push(res),
        (err: AppError) => console.log(err)
      );
  }

  updateAuthor(id: string, body: Object) {
    let index = this.authors.findIndex(x => x._id === id);
    this.author.updateAuthor(id, body)
      .subscribe(
        (res: Object) => this.authors[index] = res,
        (err: AppError) => console.log(err)
      );
  }

  deleteAuthor(id: string) {
    let index = this.authors.findIndex(x => x._id === id);
    this.author.deleteAuthor(id)
      .subscribe(
        res => {
          console.log(res)
          this.authors.splice(index, 1);
        },
        (err: AppError) => console.log(err)
      );
  }

  addAuthor(body: any) {
    this.isActive = false;
    if(this.update) this.updateAuthor(this.updateId, body);
    else this.postAuthor(body);
    console.log(body);
  }

  editAuthor(body: any) {
    this.authorInfo = body;
    this.updateId=body._id; 
    this.update=true; 
    this.isActive = true;
  }

  copyId(id: string) {
    this.clipboard.copy(id);
    this.showClipboardMessage = true;
    setTimeout(() => { this.showClipboardMessage = false }, 2000);
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    let data = new FormData();
    data.append('file', this.file);
    data.append('upload_preset', 'traderinsideme');
    data.append('cloud_name', 'traderinsideme');

    this.uploadService.uploadImage(data).subscribe(
      (res:any) => {
        this.authorInfo.image = res.url;
      },
      (err: AppError) => console.log(err)
    );
    this.fileName = this.file.name;
  }

}
