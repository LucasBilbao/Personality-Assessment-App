import { createAction, props } from '@ngrx/store';
import { PersonalitiesConstants } from '../constants/personalities';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';
import { Personality } from 'src/app/models/personality.interface';

export const getPersonalities = createAction(
  PersonalitiesConstants.GET_PERSONALITIES,
  props<{ personalityCodes: PersonalityCodeType[] }>()
);

export const getPersonalitiesSuccess = createAction(
  PersonalitiesConstants.GET_PERSONALITIES_SUCCESS,
  props<{ personalities: Personality[] }>()
);

export const getPersonalitiesFail = createAction(
  PersonalitiesConstants.GET_PERSONALITIES_FAIL,
  props<{ errorMessage: string }>()
);
