import { createAction, props } from '@ngrx/store';
import { UsersConstants } from '../constants/users.constants';
import { UserInfo } from 'src/app/models/userInfo.interface';

export const registerUser = createAction(
  UsersConstants.REGISTER_USER,
  props<{ user: UserInfo }>()
);
export const registerUserSuccess = createAction(
  UsersConstants.REGISTER_USER_SUCCESS,
  props<{ user: UserInfo }>()
);
