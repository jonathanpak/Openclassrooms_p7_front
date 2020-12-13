import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  throwError,
} from 'rxjs';

import { Router } from '@angular/router';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'signin',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const user = new User(
            resData.username,
            resData.email,
            resData.accessToken
          );
          this.user.next(user);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
    // .pipe(
    //   catchError(this.handleError),
    //   tap((resData) => {
    //     console.log(resData);
    //     const user = new User(
    //       resData.username,
    //       resData.email,
    //       resData.accessToken
    //     );
    //     this.user.next(user);
    //   })
    // );
  }

  logout() {
    this.user.next(null);
    this.tokenStorageService.signOut();
  }

  autoLogin() {
    const user: {
      username: string;
      email: string;
      id: number;
      accessToken: string;
    } = this.tokenStorageService.getUser();
    if (!user) {
      return;
    }

    const loadedUser = new User(user.username, user.email, user.accessToken);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  delete(): Observable<any> {
    if (this.user) {
      return this.http.delete(AUTH_API + 'delete/', httpOptions);
    }
  }

  getUserId(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user/', httpOptions);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/user/' + userId,
      httpOptions
    );
  }

  update(
    userId: number,
    username: string,
    imageUrl: string,
    email: string
  ): Observable<any> {
    if (this.user) {
      return this.http.put(
        AUTH_API + 'update/' + userId,
        {
          username,
          imageUrl,
          email,
        },
        httpOptions
      );
    }
  }

  private handleError() {
    const errorMessage = 'An unknown error occurred!';
    return throwError(errorMessage);
  }
}
