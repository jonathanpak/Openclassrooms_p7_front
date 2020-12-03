import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SubcategoryComponent } from './forum/subcategory/subcategory.component';
import { ThreadComponent } from './forum/thread/thread.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent } from './forum/forum.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/forum', pathMatch: 'full' },
  {
    path: 'forum',
    component: ForumComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forum/subcategory',
    component: SubcategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forum/subcategory/:id',
    component: ThreadComponent,
    canActivate: [AuthGuard],
  },

  { path: 'newsfeed', component: NewsfeedComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: ForumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
