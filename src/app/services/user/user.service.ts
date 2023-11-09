import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/userInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userInfo: UserInfo = { personalities: [] };
}
