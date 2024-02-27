import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BlogResolverService } from './blog/blog-resolver.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'article', component: ArticleComponent },
    { path: 'about', component: AboutComponent },
    { path: 'blog/:route', component: BlogComponent, resolve: { blog: BlogResolverService} },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'cookie-policy', component: CookiePolicyComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [
    {path: '', redirectTo: 'blog-list', pathMatch: 'full'},
    {path: 'blog-list', component: BlogListComponent},
    {path: 'admin-list', component: AdminListComponent},
    {path: 'author-list', component: AuthorListComponent},
    {path: 'create-blog', component: CreateBlogComponent}
  ]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
