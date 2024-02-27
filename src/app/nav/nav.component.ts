import { Router } from '@angular/router';
import { BreakpointCheckerService } from '../services/breakpointChecker/breakpoint-checker.service';
import { Component, OnInit } from '@angular/core';
import { dropdown } from '../animation';


@Component({
  selector: 'user-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    dropdown
  ]
})
export class NavComponent implements OnInit {

  isActive: boolean = false;
  searchBox = false;
  searchText='';
  drop: boolean = false;
  onSearchClick: boolean = false;
  
  constructor( public media: BreakpointCheckerService, private router: Router ) {
  }

  ngOnInit(): void {
  }

  search() {
    this.searchBox = false;
    let tags = this.searchText.split(' ').join(',').toLowerCase();
    this.router.navigate(['/article'], { queryParams: {page: 1, tags: tags}});
  }

}
