import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;

  constructor(private router: ActivatedRoute,
    private alertfy: AlertifyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.user = data['user'];
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
    });
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertfy.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertfy.error(error);
    });
  }

  updateMainPhoto (photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
