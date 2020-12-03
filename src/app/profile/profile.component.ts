import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;

  currentUser: any;
  username: string;
  email: string;
  imageUrl: string;

  constructor(private token: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.setUserDatas();
  }

  setUserDatas() {
    if (this.currentUser) {
      this.username = this.currentUser.username;
      this.email = this.currentUser.email;
      this.imageUrl = this.currentUser.imageUrl;
    }
  }

  onSubmit(form: NgForm) {
    //update User
  }
}
