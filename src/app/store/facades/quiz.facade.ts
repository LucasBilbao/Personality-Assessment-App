import { Injectable } from '@angular/core';
import { State } from '..';
import { Store } from '@ngrx/store';
import * as QuizSelectors from '../selectors/quiz.selectors';
import * as QuizActions from '../actions/quiz.actions';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';

@Injectable({
  providedIn: 'root',
})
export class QuizStateFacade {
  public isLoading$ = this.store.select(QuizSelectors.isLoadingSelector);
  public quizCollection$ = this.store.select(
    QuizSelectors.quizCollectionSelector
  );
  public errorMessage$ = this.store.select(QuizSelectors.errorMessageSelector);

  constructor(private store: Store<State>) {}

  public getQuizCollection(category: QuizCategoryType) {
    this.store.dispatch(QuizActions.getQuizCollection({ category }));
  }
}
