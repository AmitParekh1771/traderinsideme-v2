import { SEOServiceService } from './../services/SEO-service/seo-service.service';
import { AppError } from './../services/app-error';
import { AuthorService } from './../services/author/author.service';
import { BreakpointCheckerService } from './../services/breakpointChecker/breakpoint-checker.service';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  fragment = "";
  authors:any = [];

  constructor(
    public media: BreakpointCheckerService,
    private route: ActivatedRoute,
    private author: AuthorService,
    private seo: SEOServiceService
    ) { }

  @ViewChildren("target") target: QueryList<ElementRef>;
  ngOnInit(): void {
    this.seo.updateTitle("About | TraderInsideMe");
    this.seo.canonicalLink("https://traderinsideme.com/about/");
    this.seo.updateDescription("Traderinsideme post knowledgeable content on share market. Know more about us.");
    this.seo.socialMediaURL("https://traderinsideme.com/about/");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
    this.author.getAuthors()
      .subscribe(
        res => {
          this.authors = res;
        },
        (err: AppError) => console.log(err)
      );
    this.route.fragment
      .subscribe( fragment => this.fragment = fragment );
  }

  ngAfterViewInit(): void {
    this.target.changes.subscribe(() => {
      if(this.fragment) {
        document.getElementById(this.fragment).scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        });
      }
    });
  }


}
