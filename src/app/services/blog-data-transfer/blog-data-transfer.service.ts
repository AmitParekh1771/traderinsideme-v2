import { Router } from '@angular/router';
import { AppError } from './../app-error';
import { ArticleService } from './../articles/article.service';
import { Blog } from './../../blogDefination.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogDataTransferService {

  blog: Blog;
  update: boolean = false;
  constructor(
    private blogsData: ArticleService,
    private router: Router) { 
      this.blog = new Blog();
    }

  editBlog(route: string) {
    this.blogsData.getBlog(route).subscribe(
      (res: Blog) => {
        this.blog = res;
        this.update = true;
        this.router.navigate(['/admin/create-blog']);
      },
      (err: AppError) => console.log(err)
    );
  }
}
