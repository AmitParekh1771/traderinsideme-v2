import { AppError } from './../services/app-error';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger, transition, query, stagger, animateChild, animate, state, style } from '@angular/animations';
import { SEOServiceService } from '../services/SEO-service/seo-service.service';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';
import { fadein } from '../animation';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('heroAnimation', [
      state('*', style({ visibility: 'visible' })),
      transition(':enter', [
        query('@fadein', stagger(300, animateChild()))
      ])
    ]),
    fadein,
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
export class HomeComponent implements OnInit {

  emailPostURL:string = environment.emailPostURL;
  convertkitApi:string = environment.convertkitApiKey;
  message:string = 'Hi trader...A confirmation email has been sent to ${email}. (Do check your spam folder if not displaying in inbox)';
  showConfirmationMessage = false;
  constructor( 
    public media:BreakpointCheckerService, 
    private seo: SEOServiceService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.seo.updateTitle("TraderInsideMe | Trade Price Action With Me");
    this.seo.canonicalLink("https://traderinsideme.com");
    this.seo.updateDescription("Traderinsideme is the blog that post amazing articles and spread awareness about financial market trading.");
    this.seo.socialMediaURL("https://traderinsideme.com");
    this.seo.socialMediaImageURL("https://traderinsideme.com/assets/traderinsideme.jpg");
  }

  subscribe(email: string) {
    this.http.post(`${this.emailPostURL}`, {
      'api_key': this.convertkitApi,
      'email': email
    },{headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(
        res => {
          console.log(res);
          this.message = `Hi trader...A confirmation email has been sent to ${email}. (Do check your spam folder if not displaying in inbox)`;
          this.showConfirmationMessage = true;
          setTimeout(() => { this.showConfirmationMessage = false }, 7000);
        },
        (err: AppError) => console.log(err)
      );
  }

}
