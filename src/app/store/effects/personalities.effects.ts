import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PersonalitiesActions from '../actions/personalities.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { QuizCategoryType } from 'src/app/models/quizCategory.type';
import { QuizCollection } from 'src/app/models/quiz.interface';
import { PersonalityService } from 'src/app/services/personality/personality.service';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';
import { Personality } from 'src/app/models/personality.interface';

@Injectable()
export class PersonalitiesEffects {
  constructor(
    private action$: Actions,
    private personalityService: PersonalityService
  ) {}

  public getPersonalities$ = createEffect(() =>
    this.action$.pipe(
      ofType(PersonalitiesActions.getPersonalities),
      mergeMap(
        ({ personalityCodes }: { personalityCodes: PersonalityCodeType[] }) =>
          this.personalityService.getPersonalities(personalityCodes).pipe(
            map(({ personalities }: { personalities: Personality[] }) =>
              PersonalitiesActions.getPersonalitiesSuccess({
                personalities,
              })
            ),
            catchError((error) =>
              of(PersonalitiesActions.getPersonalitiesFail(error.message))
            )
          )
      )
    )
  );
}
