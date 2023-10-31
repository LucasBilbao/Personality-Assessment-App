import { createReducer, on } from '@ngrx/store';
import { QuizCollection } from 'src/app/models/quiz.interface';
import * as QuizActions from '../actions/quiz.actions';

export const quizCollectionFeatureKey = 'quiz';

export interface QuizCollectionState {
  quizCollection: QuizCollection | null;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: QuizCollectionState = {
  quizCollection: null,
  isLoading: false,
  errorMessage: '',
};

export const quizCollectionReducer = createReducer(
  initialState,
  on(QuizActions.getQuizCollection, (state) => ({ ...state, isLoading: true })),
  on(QuizActions.getQuizCollectionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    quizCollection: action.quizCollection,
  })),
  on(QuizActions.getQuizCollectionFail, (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.errorMessage,
  }))
);
