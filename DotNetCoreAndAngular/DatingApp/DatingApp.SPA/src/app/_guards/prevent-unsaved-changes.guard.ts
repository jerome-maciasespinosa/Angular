import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (component.editForm.dirty) {
          return confirm('Are you sure you want to continue ? Any unsaved changes will be lost');
        }
        return true;
  }
}
