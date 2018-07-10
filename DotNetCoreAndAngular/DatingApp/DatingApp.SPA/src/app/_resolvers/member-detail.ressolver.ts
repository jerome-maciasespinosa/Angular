import { AlertifyService } from './../_services/alertify.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/operator/catch';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor (private userService: UserService, private router: Router, private alertify: AlertifyService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.userService.getUser(route.params['id']).catch(erro => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }
}
