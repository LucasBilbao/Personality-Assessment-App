import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/userInfo.interface';
import { DEFAULT_USER_PARAMS } from '../../utils/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userInfo: UserInfo = DEFAULT_USER_PARAMS;
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  public signUp(userInfo: UserInfo): void {
    this.userInfo = userInfo;
    this.isAuthorized = true;
  }

  public publishUser(): void {
    this.http.post('/api/v1/users/register', this.userInfo).subscribe(() => {
      this.router.navigate(['/thanks']);
    });
  }

  public signIn(userInfo: UserInfo): void {
    this.http
      .post<{ user: UserInfo }>('/api/v1/users/login', userInfo)
      .subscribe((payload) => {
        this.userInfo = payload.user;
        this.isAuthorized = true;
        this.router.navigate(['/results']);
      });
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
