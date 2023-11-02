import { PersonalityCodeType } from './personalityCode.type';

export interface UserInfo {
  id?: string;
  userName: string;
  password: string;
  personalities?: PersonalityCodeType[];
}
