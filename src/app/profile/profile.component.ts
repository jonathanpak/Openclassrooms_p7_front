import { User } from './../shared/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  userSubscription: Subscription;

  currentUser: any;
  username: string;
  email: string;
  imageUrl: string;

  updated = false;

  constructor(
    private token: TokenStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userSubscription = this.authService
      .getUser(this.currentUser.id)
      .subscribe(
        (user) => {
          this.currentUser = user;

          const userUpdated = new User(
            user.username,
            user.email,
            user.accessToken
          );

          this.authService.user.next(userUpdated);
        },
        (err) => console.log(err),
        () => {
          this.setUserDatas();
          console.log('Success');
          // User.next
        }
      );
  }

  setUserDatas() {
    if (this.currentUser) {
      this.username = this.currentUser.username;
      this.email = this.currentUser.email;
      this.imageUrl = this.currentUser.imageUrl;
    }
  }

  onSubmit(form: NgForm) {
    this.authService
      .update(
        this.currentUser.id,
        form.value.username,
        form.value.imageUrl,
        form.value.email
      )
      .subscribe(
        () => console.log('User updated successfully'),
        (err) => console.log(err),
        () => {
          this.updated = true;
        }
      );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
