import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/models/userInfo';
import { DEFAULT_USER_PARAMS } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userInfo: UserInfo = DEFAULT_USER_PARAMS;
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public signUp(userInfo: UserInfo): void {
    this.userInfo = userInfo;
    this.isAuthorized = true;
  }

  public signOut(): void {
    this.userInfo = DEFAULT_USER_PARAMS;
    this.isAuthorized = false;
  }

  public get isAuthorized(): boolean {
    return this.isAuthorized$$.value;
  }

  public set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }
}
