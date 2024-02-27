import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { SEOServiceService } from './services/SEO-service/seo-service.service';
import { AuthorService } from './services/author/author.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BreakpointCheckerService } from './services/breakpointChecker/breakpoint-checker.service';
import { ArticleService } from './services/articles/article.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PipeModule } from './pipe/pipe.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LoginComponent } from './login/login.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AceConfigInterface, AceModule, ACE_CONFIG } from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/html';
import 'brace/theme/github';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { CloudinaryUploadService } from './services/cloudinary-upload/cloudinary-upload.service';
import { AuthService } from './services/auth/auth.service';
import { AdminService } from './services/admin/admin.service';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';


const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  wrap: true,
  tabSize: 4,
  cursorStyle: 'slim',
  fontFamily: 'monospace',
  useSoftTabs: false
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ArticleComponent,
    FooterComponent,
    BlogComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    CookiePolicyComponent,
    NotFoundComponent,
    AdminComponent,
    AdminListComponent,
    LoginComponent,
    BlogListComponent,
    AuthorListComponent,
    CreateBlogComponent,
    NotFoundComponent,
    SpinnerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    AppRoutingModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    PipeModule,
    AceModule,
    CommonModule
  ],
  providers: [
    BreakpointCheckerService,
    ArticleService,
    AuthorService,
    SEOServiceService,
    AdminService,
    AuthGuardService,
    CloudinaryUploadService,
    AuthService,
    { provide: ACE_CONFIG, useValue: DEFAULT_ACE_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
