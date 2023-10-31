import { PersonalityCodeType } from './personalityCode.type';

// export type SelectionsType = { [key: string]: PersonalityCodeType[] };
export interface Selections {
  [key: string]: PersonalityCodeType[];
}
