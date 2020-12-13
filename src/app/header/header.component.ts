import { Subscription } from 'rxjs';
import { TokenStorageService } from './../shared/token-storage.service';
import { AuthService } from './../shared/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;

  public isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onUnsubscribe() {
    this.authService.delete().subscribe(
      () => console.log('User deleted'),
      (error) => console.log(error),
      () => this.authService.logout()
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
