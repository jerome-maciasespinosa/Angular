import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertifyServ: AlertifyService) { }

  ngOnInit() {
    
  }

  sendLike (id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertifyServ.success('You have liked: ' + this.user.knownAs);
    }, error => {
      this.alertifyServ.error(error);
    });
  }

}
