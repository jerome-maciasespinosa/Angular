import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

import { JwtHelper } from 'angular2-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authservice: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authservice.decodedToken = this.jwtHelper.decodeToken(token);
      console.log('auth');
    }
    if (user) {
      this.authservice.currentUser = user;
      if (this.authservice.currentUser.photoUrl !== null) {
        this.authservice.changeMemberPhoto(user.photoUrl);
      } else {
        this.authservice.changeMemberPhoto('../../assets/user.png');
      }
    }
  }
}
