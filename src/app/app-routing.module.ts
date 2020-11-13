import { SinglePostComponent } from './forum/single-post/single-post.component';
import { SubcategoryComponent } from './forum/subcategory/subcategory.component';
import { ThreadComponent } from './forum/thread/thread.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent } from './forum/forum.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
    path: 'forum/subcategory',
    component: SubcategoryComponent,
    children: [
      //{ path: 'new', component: RecipeEditComponent },
    ],
  },
  { path: 'forum/subcategory/:id', component: ThreadComponent },

  { path: 'newsfeed', component: NewsfeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
