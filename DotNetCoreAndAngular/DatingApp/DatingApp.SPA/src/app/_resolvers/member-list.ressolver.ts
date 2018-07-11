import { AlertifyService } from './../_services/alertify.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/operator/catch';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  pageSize = 5;
  pageNumber = 1;

  constructor (private userService: UserService, private router: Router, private alertify: AlertifyService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User[] | Observable<User[]> | Promise<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).catch(erro => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }
}
