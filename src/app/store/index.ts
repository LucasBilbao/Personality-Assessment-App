import { ActionReducerMap } from '@ngrx/store';
import {
  QuizCollectionState,
  quizCollectionReducer,
} from './reducers/quiz.reducer';
import { QuizEffects } from './effects/quiz.effects';
import {
  PersonalitiesState,
  personalitiesReducer,
} from './reducers/personalities.reducer';
import { PersonalitiesEffects } from './effects/personalities.effects';

export interface State {
  quiz: QuizCollectionState;
  personality: PersonalitiesState;
}

export const reducers: ActionReducerMap<State> = {
  quiz: quizCollectionReducer,
  personality: personalitiesReducer,
};

export const effects = [QuizEffects, PersonalitiesEffects];
