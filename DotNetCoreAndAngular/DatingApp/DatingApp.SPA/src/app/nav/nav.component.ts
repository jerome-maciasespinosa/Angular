import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any ={};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    this.authService.login(this.model).subscribe(data =>{
      console.log('logged in successfully', data);
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;  // token !== null // return true if token
  }

}
