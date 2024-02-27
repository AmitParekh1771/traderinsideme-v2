import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointCheckerService {

  above_1360:boolean = false;
  _1360_1250:boolean = false;
  _1250_1075:boolean = false;
  _1075_960:boolean = false;
  _960_800:boolean = false;
  _800_600:boolean = false;
  _600_425:boolean = false;
  _425_280:boolean = false;
  below_280:boolean = false;

  s:boolean = false;
  m:boolean = false;
  l:boolean = false;

  constructor( public breakpointObserver: BreakpointObserver ) {
    breakpointObserver
      .observe(['(min-width: 1360px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this.above_1360=true;
        else this.above_1360=false;
      });

    breakpointObserver
      .observe(['(max-width: 1360px) and (min-width: 1250px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._1360_1250=true;
        else this._1360_1250=false;
      });

    breakpointObserver
      .observe(['(max-width: 1250px) and (min-width: 1075px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._1250_1075=true;
        else this._1250_1075=false;
      });

    breakpointObserver
      .observe(['(max-width: 1075px) and (min-width: 960px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._1075_960=true;
        else this._1075_960=false;
      });

    breakpointObserver
      .observe(['(max-width: 960px) and (min-width: 800px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._960_800=true;
        else this._960_800=false;
      });

    breakpointObserver
      .observe(['(max-width: 800px) and (min-width: 600px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._800_600=true;
        else this._800_600=false;
      });

    breakpointObserver
      .observe(['(max-width: 600px) and (min-width: 425px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._600_425=true;
        else this._600_425=false;
      });

    breakpointObserver
      .observe(['(max-width: 425px) and (min-width: 280px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this._425_280=true;
        else this._425_280=false;
      });

    breakpointObserver
      .observe(['(max-width: 280px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this.below_280=true;
        else this.below_280=false;
      });

    breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this.s=true;
        else this.s=false;
      });

    breakpointObserver
      .observe(['(max-width: 1075px) and (min-width: 600px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this.m=true;
        else this.m=false;
      });

    breakpointObserver
      .observe(['(min-width: 1075px)'])
      .subscribe( (state: BreakpointState) => {
        // console.log(state);
        if(state.matches) this.l=true;
        else this.l=false;
      });
  }


}
