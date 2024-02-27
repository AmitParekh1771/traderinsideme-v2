import { CloudinaryUploadService } from './../services/cloudinary-upload/cloudinary-upload.service';
import { AuthorService } from './../services/author/author.service';
import { BlogDataTransferService } from './../services/blog-data-transfer/blog-data-transfer.service';
import { AppError } from './../services/app-error';
import { BlogList } from './../blogListDefination.type';
import { ArticleService } from './../services/articles/article.service';
import { Blog } from './../blogDefination.type';
import { BreakpointCheckerService } from './../services/breakpointChecker/breakpoint-checker.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'admin-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  encapsulation: ViewEncapsulation.None,
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
export class CreateBlogComponent implements OnInit {

  blog: Blog;
  authorID:string = '';
  update = false;
  file: File = null;
  fileURL: string = '';
  message:string = '';
  showClipboardMessage = false;
  fileName: string = '';
  blogs: BlogList;
  authors:any = [];
  constructor(
    public media: BreakpointCheckerService,
    private blogsData: ArticleService,
    private blogDataTransfer: BlogDataTransferService,
    private authorData: AuthorService,
    private uploadService: CloudinaryUploadService) { }

  ngOnInit(): void {
    this.update = this.blogDataTransfer.update;
    this.blog = this.blogDataTransfer.blog;
    this.authorID = this.blog.author._id;
    this.authorData.getAuthors().subscribe(
      res => this.authors = res,
      (err: AppError) => console.log(err)
    );
  }

  addBlog(body: any) {
    this.blog.isPublished = true;
    let uploadBody = {
      contentTitle: this.blog.contentTitle,
      title: this.blog.title,
      canonicalURL: this.blog.canonicalURL,
      isPublished: this.blog.isPublished,
      image: this.blog.image,
      description: this.blog.description,
      tags: this.blog.tags,
      categories: this.blog.categories,
      author: this.blog.author._id,
      content: this.blog.content,
      route: this.blog.route
    };
    if(this.blogDataTransfer.update) {
      this.blogsData.updateBlog(this.blog._id, uploadBody).subscribe(
        (res: Blog) => {
          console.log(res);
          this.popUp("Blog updated successfully.");
        },
        (err: AppError) => console.log(err)
      );
    }
    else {
      this.blogsData.postBlog(uploadBody).subscribe(
        (res: Blog) => {
          console.log(res)
          this.popUp("Blog published successfully.");
        },
        (err: AppError) => console.log(err)
      );
    }
  }

  uploadFile(event) {
    this.file = event.target.files[0];
    let data = new FormData();
    data.append('file', this.file);
    data.append('upload_preset', 'traderinsideme');
    data.append('cloud_name', 'traderinsideme');

    this.uploadService.uploadImage(data).subscribe(
      (res:any) => {
        this.fileURL = res.url;
      },
      (err: AppError) => console.log(err)
    );
    this.fileName = this.file.name;
  }

  updateAuthor(body: any) {
    let author = this.authors.find((x:any) => x._id === body.value);
    this.blog.author = author;
  }

  popUp(msg: string) {
    this.message = msg;
    this.showClipboardMessage = true;
    setTimeout(() => { this.showClipboardMessage = false }, 2000);
  }

  saveChanges() {
    this.blogDataTransfer.blog = this.blog;
  }

  updateTags(tags: any) {
    this.blog.tags = tags.value.split(',');
  }
  resetWork() {
    this.blog = new Blog();
    this.blogDataTransfer.update = false;
    this.update = false;
  }


}
