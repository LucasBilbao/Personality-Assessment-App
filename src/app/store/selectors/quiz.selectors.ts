import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  QuizCollectionState,
  quizCollectionFeatureKey,
} from '../reducers/quiz.reducer';

export const quizCollectionFeatureSelector =
  createFeatureSelector<QuizCollectionState>(quizCollectionFeatureKey);

export const isLoadingSelector = createSelector(
  quizCollectionFeatureSelector,
  (state: QuizCollectionState) => state.isLoading
);

export const quizCollectionSelector = createSelector(
  quizCollectionFeatureSelector,
  (state: QuizCollectionState) => state.quizCollection
);

export const errorMessageSelector = createSelector(
  quizCollectionFeatureSelector,
  (state: QuizCollectionState) => state.errorMessage
);
