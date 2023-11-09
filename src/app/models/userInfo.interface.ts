import { PersonalityCodeType } from './personalityCode.type';

export interface UserInfo {
  personalities: UserPersonality[];
}

export interface UserPersonality {
  personalityCode: PersonalityCodeType;
  coefficient: number;
  chosenTimes: number;
}
