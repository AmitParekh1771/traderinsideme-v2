import { SEOServiceService } from './../services/SEO-service/seo-service.service';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public media: BreakpointCheckerService, private seo: SEOServiceService) { }

  ngOnInit(): void {
    this.seo.updateTitle("Privacy policy | TraderInsideMe");
    this.seo.canonicalLink("https://traderinsideme.com/privacy-policy/");
    this.seo.updateDescription("This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of information. Read our privacy policy here.");
    this.seo.socialMediaURL("https://traderinsideme.com/privacy-policy/");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
  }

}
