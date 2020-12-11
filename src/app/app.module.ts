import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ForumComponent } from './forum/forum.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { SinglePostComponent } from './forum/single-post/single-post.component';
import { ThreadComponent } from './forum/thread/thread.component';
import { SubcategoryComponent } from './forum/subcategory/subcategory.component';
import { NewThreadComponent } from './forum/subcategory/new-thread/new-thread.component';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForumComponent,
    NewsfeedComponent,
    SinglePostComponent,
    ThreadComponent,
    SubcategoryComponent,
    NewThreadComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
