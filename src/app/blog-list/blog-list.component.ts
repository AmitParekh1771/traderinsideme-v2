
import { BlogDataTransferService } from './../services/blog-data-transfer/blog-data-transfer.service';
import { Blog } from './../blogDefination.type';
import { AppError } from './../services/app-error';
import { BlogList } from './../blogListDefination.type';
import { ArticleService } from './../services/articles/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: BlogList[] = [];
  blog: Blog;
  constructor(
    private blogsData: ArticleService,
    private blogDataTransfer: BlogDataTransferService) { }

  ngOnInit(): void {
    this.blogsData.getBlogs()
      .subscribe(
        (res: BlogList[]) => this.blogs = res,
        (err: AppError) => console.log(err)
      );
  }

  deleteBlog(id:string) {
    if(confirm("Delete Blog")) {
      this.blogsData.deleteBlog(id).subscribe(
        res => {
          let index = this.blogs.findIndex(x => x._id === id);
          this.blogs.splice(index, 1);
          console.log(res);
        },
        (err: AppError) => console.log(err)
      );
    }
  }

  editBlog(route: string) {
    this.blogDataTransfer.editBlog(route);
  }

  togglePublish(route: string) {
    this.blogsData.getBlog(route).subscribe(
      (res: Blog) => {
        res.isPublished = !res.isPublished;
        this.updateBlog(res._id, res);
      },
      (err: AppError) => console.log(err)
    );
  }

  updateBlog(id: string, body: Blog) {
    this.blogsData.updateBlog(id, {
      contentTitle: body.contentTitle,
      title: body.title,
      canonicalURL: body.canonicalURL,
      isPublished: body.isPublished,
      image: body.image,
      description: body.description,
      tags: body.tags,
      categories: body.categories,
      author: body.author._id,
      content: body.content,
      route: body.route
    }).subscribe(
      (res: Blog) => this.blog = res,
      (err: AppError) => console.log(err)
    );
  }
}
