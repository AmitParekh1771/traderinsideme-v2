import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public media: BreakpointCheckerService) { }

  ngOnInit(): void {
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
