import { SEOServiceService } from './../services/SEO-service/seo-service.service';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.css']
})
export class CookiePolicyComponent implements OnInit {

  constructor(public media: BreakpointCheckerService, private seo: SEOServiceService) { }

  ngOnInit(): void {
    this.seo.updateTitle("Cookie Policy | TraderInsideMe");
    this.seo.canonicalLink("https://traderinsideme.com/cookie-policy/");
    this.seo.updateDescription("Traderinsideme use cookies for a variety of reasons. Read our cookie policy here.");
    this.seo.socialMediaURL("https://traderinsideme.com/cookie-policy/");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
  }

}
