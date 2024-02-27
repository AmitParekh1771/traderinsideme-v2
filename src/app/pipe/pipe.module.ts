import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizeHtmlPipe
  ]
})
export class PipeModule { }
