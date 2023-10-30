import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  private authorizationGuard(): boolean | UrlTree {
    if (this.userService.isAuthorized) {
      return true;
    }

    return this.router.createUrlTree(['registration']);
  }

  public canActivate(): boolean | UrlTree {
    return this.authorizationGuard();
  }

  public canLoad(): boolean | UrlTree {
    return this.authorizationGuard();
  }
}
