import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuizActions from '../actions/quiz.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';
import { QuizCollection } from 'src/app/models/quiz.interface';

@Injectable()
export class QuizEffects {
  constructor(private action$: Actions, private quizService: QuizService) {}

  public getQuizCollection$ = createEffect(() =>
    this.action$.pipe(
      ofType(QuizActions.getQuizCollection),
      mergeMap(({ category }: { category: QuizCategoryType }) =>
        this.quizService.getQuizCollection(category).pipe(
          map(({ quiz }: { quiz: QuizCollection }) =>
            QuizActions.getQuizCollectionSuccess({ quizCollection: quiz })
          ),
          catchError((error) =>
            of(QuizActions.getQuizCollectionFail(error.message))
          )
        )
      )
    )
  );
}
