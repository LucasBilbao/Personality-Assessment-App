import { PersonalityCodeType } from './personalityCode.type';

export interface Quiz {
  personalityCode: PersonalityCodeType;
  title?: string;
  imgPath?: string;
}

export interface QuizCollection {
  question: string;
  data: Quiz[];
}
