
import { SEOServiceService } from './../services/SEO-service/seo-service.service';
import { BlogList } from './../blogListDefination.type';
import { AppError } from './../services/app-error';

import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { ArticleService } from '../services/articles/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  blogs:BlogList[] = [];
  blogList:BlogList[] = [];
  displayH1 = false;
  displayTitle = "Articles";
  tags:any;
  category: any;
  totalPages:number = 0;
  pageSize:number = 10;
  currentPage:number = 1;
  prevPage: number = 0;
  prev2prevPage: number = 0;
  nextPage: number = 0;
  next2nextPage: number = 0;

  constructor( 
    public media:BreakpointCheckerService, 
    public blogData: ArticleService, 
    public route: ActivatedRoute,
    private seo: SEOServiceService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.includes("/article")) { this.pageSEO(); this.displayH1 = !this.displayH1}
    this.route.queryParamMap.subscribe( queryParams => {
      this.category = queryParams.get('category');
      this.displayTitle = this.category ? this.category.split('-').join(' ') : "Articles";
      this.tags = queryParams.get('tags');
      this.currentPage = +queryParams.get('page')! || 1;
      this.blogData.getBlogs()
        .subscribe( (res:BlogList[]) => {
          this.blogList = res;
          this.blogList = this.blogList.filter(x => x.isPublished === true);
          this.blogs = [];
          if(this.tags) {
            this.filterAndSortByTags(this.tags);
          }
          else if(this.category) {
            this.filterByCategories(this.category);
          }
          else {
            this.blogs = this.blogList;
          }
          this.totalPages = Math.ceil(this.blogs.length/this.pageSize);
          this.updatePagination();
        }, (err: AppError) => {
          console.log(err);
        });
      
    });
  }
  pageSEO() {
    this.seo.updateTitle("Article | TraderInsideMe");
    this.seo.canonicalLink("https://traderinsideme.com/article/");
    this.seo.updateDescription("Articles on Price Action, Trading Psychology, Life Management, Risk Management and all about financial market you like to read.");
    this.seo.socialMediaURL("https://traderinsideme.com/article/");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
  }

  updatePagination() {
    this.prevPage = this.currentPage>1 ? (this.currentPage - 1) : 0;
    this.prev2prevPage = this.currentPage>2 ? (this.currentPage - 2) : 0;
    this.nextPage = this.currentPage<this.totalPages ? (this.currentPage + 1) : 0;
    this.next2nextPage = this.currentPage<(this.totalPages - 1) ? (this.currentPage + 2) : 0;
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  
  filterAndSortByTags(tags: string) {
    let tagsArray = tags.split(',');
    let i=0, j=0, n=this.blogList.length;
    for(i=0 ; i<n ; i++) {
      if(!compareArray(tagsArray, this.blogList[i].tags)) {
        continue;
      }
      this.blogs.push(this.blogList[i]);
    }
    n = this.blogs.length;
    for(i=1 ; i<=n ; i++) {
      for(j=n-1 ; j>=i ; j--) {
        let a = compareArray(tagsArray, this.blogs[j].tags);
        let b = compareArray(tagsArray, this.blogs[j-1].tags);
        let temp:BlogList;
        if(a>b) {
          temp = this.blogs[j];
          this.blogs[j] = this.blogs[j-1];
          this.blogs[j-1] = temp;
        }
      }
    }
  }
  
  
  filterByCategories(categories: string) {
    let categoriesArray = categories.split(',');
    let i=0, j=0, n=this.blogList.length;
    for(i=0 ; i<n ; i++) {
      if(!compareArray(categoriesArray, this.blogList[i].categories)) {
        continue;
      }
      this.blogs.push(this.blogList[i]);
    }
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
