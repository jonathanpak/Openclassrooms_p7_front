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
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
