import { ActionReducerMap } from '@ngrx/store';
import {
  QuizCollectionState,
  quizCollectionReducer,
} from './reducers/quiz.reducer';
import { QuizEffects } from './effects/quiz.effects';

export interface State {
  quiz: QuizCollectionState;
}

export const reducers: ActionReducerMap<State> = {
  quiz: quizCollectionReducer,
};

export const effects = [QuizEffects];
