import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    this.authService.login(this.model).subscribe(data => {
     this.alertifyService.success('logged in successfully');
    }, error => {
      this.alertifyService.error('Failed to login');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;  // token !== null // return true if token
    return this.authService.loggedIn();
  }

}
