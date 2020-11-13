import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    new User(
      0,
      'John Doe',
      'john@gmail.com',
      'Advisor',
      'Accountability',
      'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg'
    ),
    new User(
      1,
      'Mia Frye',
      'mia@gmail.com',
      'CEO',
      'Original Department',
      'https://tel.img.pmdstatic.net/fit/https.3A.2F.2Fprd2-tel-epg-img.2Es3-eu-west-1.2Eamazonaws.2Ecom.2FproviderPerson.2Ff214c0a3af7155749.2Ejpeg/280x280/quality/80/mia-frye.jpeg'
    ),
  ];

  constructor() {}

  // Fake Get User by Id
  getUser(id: number) {
    return this.users[id];
  }
}
