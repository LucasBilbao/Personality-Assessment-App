import { createReducer, on } from '@ngrx/store';
import { QuizCollection } from 'src/app/models/quiz.interface';
import * as PersonalitiesActions from '../actions/personalities.actions';
import { Personality } from 'src/app/models/personality.interface';

export const personalitiesFeatureKey = 'personality';

export interface PersonalitiesState {
  personalities: Personality[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: PersonalitiesState = {
  personalities: [],
  isLoading: false,
  errorMessage: '',
};

export const personalitiesReducer = createReducer(
  initialState,
  on(PersonalitiesActions.getPersonalities, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(PersonalitiesActions.getPersonalitiesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    personalities: action.personalities,
  })),
  on(PersonalitiesActions.getPersonalitiesFail, (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.errorMessage,
  }))
);
