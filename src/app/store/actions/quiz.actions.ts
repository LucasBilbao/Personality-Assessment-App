import { createAction, props } from '@ngrx/store';
import { QuizConstants } from '../constants/quiz.constants';
import { QuizCollection } from 'src/app/models/quiz.interface';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';

export const getQuizCollection = createAction(
  QuizConstants.GET_QUIZ_COLLECTION,
  props<{ category: QuizCategoryType }>()
);

export const getQuizCollectionSuccess = createAction(
  QuizConstants.GET_QUIZ_COLLECTION_SUCCESS,
  props<{ quizCollection: QuizCollection }>()
);

export const getQuizCollectionFail = createAction(
  QuizConstants.GET_QUIZ_COLLECTION_FAIL,
  props<{ errorMessage: string }>()
);
