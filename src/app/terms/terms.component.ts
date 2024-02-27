import { SEOServiceService } from './../services/SEO-service/seo-service.service';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(public media: BreakpointCheckerService, private seo: SEOServiceService) { }

  ngOnInit(): void {
    this.seo.updateTitle("Terms | TraderInsideMe");
    this.seo.canonicalLink("https://traderinsideme.com/terms/");
    this.seo.updateDescription("By accessing this website we assume you accept these terms and conditions. Read our terms and condition here.");
    this.seo.socialMediaURL("https://traderinsideme.com/terms/");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
  }

}
