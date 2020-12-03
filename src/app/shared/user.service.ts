import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user.model';

const API_URL = 'http://localhost:3000/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    new User('John Doe', 'john@gmail.com', 'faketoken'),
    new User('Mia Frye', 'mia@gmail.com', 'fakeToken2'),
  ];

  constructor(private http: HttpClient) {}

  // Fake Get User by Id
  getUser(id: number) {
    return this.users[id];
  }

  // Role based content

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
