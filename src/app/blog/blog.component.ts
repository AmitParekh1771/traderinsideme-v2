
import { AppError } from './../services/app-error';
import { BlogList } from './../blogListDefination.type';
import { ActivatedRoute, Router } from '@angular/router';
var MD5 = require("blueimp-md5");

import { ArticleService } from '../services/articles/article.service';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SEOServiceService } from '../services/SEO-service/seo-service.service';
import { Blog } from '../blogDefination.type';

@Component({
  selector: 'user-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit {
  blog: Blog;
  commentorData: any;
  commentList:any = [];
  currentBlogIndex = 0;
  totalBlogs = 0;
  relatedArticles: BlogList[] = [];
  blogList:BlogList[] = [];

  constructor(
    public media: BreakpointCheckerService, 
    private seo: SEOServiceService,
    private blogService: ArticleService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {
    this.route.data.subscribe( res => { 
      this.commentList = [];
      this.blog = res.blog; 
      this.blogService.getComments(this.blog._id)
        .subscribe( res => {
          this.commentList = res;
        }, (err: AppError) => { console.log(err) });
      if(!this.blog.isPublished)
        this.router.navigate(['not-found']);
      this.getAllBlogs();
      this.pageSEO();
    }, (err: AppError) => { console.log(err) });
    this.commentorData = JSON.parse(localStorage.getItem('traderinsideme_commentor'));
  }

  getAllBlogs() {
    this.blogService.getBlogs()
    .subscribe( (res:BlogList[]) => {
      this.blogList = res;
      this.blogList = this.blogList.filter(x => x.isPublished === true);
      this.totalBlogs = this.blogList.length;
      this.currentBlogIndex = this.blogList.findIndex(x => x._id === this.blog._id);
      this.getRelatedArticles();
    }, (err: AppError) => {
      console.log(err);
    });
  }

  pageSEO():void {
    this.seo.updateTitle(this.blog.title);
    this.seo.canonicalLink(this.blog.canonicalURL);
    this.seo.updateDescription(this.blog.description);
    this.seo.socialMediaURL(this.blog.canonicalURL);
    this.seo.socialMediaImageURL(this.blog.image);
  }

  getRelatedArticles():void {
    this.relatedArticles = [];
    this.filterAndSortByTags(this.blog.tags.join(','));
    this.relatedArticles = this.relatedArticles.slice(0,4);
  }


  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  filterAndSortByTags(tags: string) {
    let tagsArray = tags.split(',');
    let i=0, j=0, n=this.blogList.length;
    for(i=0 ; i<n ; i++) {
      if(!compareArray(tagsArray, this.blogList[i].tags) || this.currentBlogIndex === i) {
        continue;
      }
      this.relatedArticles.push(this.blogList[i]);
    }
    n = this.relatedArticles.length;
    for(i=1 ; i<=n ; i++) {
      for(j=n-1 ; j>=i ; j--) {
        let a = compareArray(tagsArray, this.relatedArticles[j].tags);
        let b = compareArray(tagsArray, this.relatedArticles[j-1].tags);
        let temp:BlogList;
        if(a>b) {
          temp = this.relatedArticles[j];
          this.relatedArticles[j] = this.relatedArticles[j-1];
          this.relatedArticles[j-1] = temp;
        }
      }
    }
  }

  scrollToId(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  comment(f: any) {
    if(f.saveInBrowser) {
      localStorage.setItem('traderinsideme_commentor', JSON.stringify(f));
    }

    let gravatarUrl = `https://www.gravatar.com/avatar/${MD5(f.email.trim().toLowerCase())}?s=50&d=mm&r=g`;
    let body = {
      blogRoute: this.blog.route,
      blogId: this.blog._id,
      gravatar: gravatarUrl,
      website: f.website || '#',
      name: f.name,
      commentText: f.commentText,
      email: f.email
    };

    this.blogService.postComments(body).subscribe(
      res => { 
        console.log(res);
        this.commentList.splice(0, 0, {
          modifyingDate: new Date(),
          ...body
        })
      },
      (err: AppError) => {console.log(err)}
    );
  }

}

function compareArray(a: string[], b: string[]) {
  let i=0, j=0, count=0;
  for(i=0 ; i<a.length ; i++) {
    for(j=0 ; j<b.length ; j++) {
      if(a[i]===b[j])
        count++;
    }
  }
  return count;
}
