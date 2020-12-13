import { Subscription } from 'rxjs';
import { TokenStorageService } from './../shared/token-storage.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupSubscription: Subscription;
  loginSubscription: Subscription;
  form: any = {};
  isSignUpFailed = false;
  errorMessage = '';

  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.signupSubscription = this.authService
      .register(username, email, password)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
        () => {
          this.loginSubscription = this.authService
            .login(username, password)
            .subscribe(
              (data) => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.router.navigate(['/forum']);
              },
              (err) => console.log(err),
              () => this.loginSubscription.unsubscribe()
            );
          this.signupSubscription.unsubscribe();
        }
      );
  }
}
