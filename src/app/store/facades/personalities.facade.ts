import { Injectable } from '@angular/core';
import { State } from '..';
import { Store } from '@ngrx/store';
import * as PersonalitiesSelectors from '../selectors/personalities.selectors';
import * as PersonalitiesActions from '../actions/personalities.actions';
import { PersonalityCodeType } from 'src/app/models/personalityCode.type';

@Injectable({
  providedIn: 'root',
})
export class PersonalitiesStateFacade {
  public isLoading$ = this.store.select(
    PersonalitiesSelectors.isLoadingSelector
  );
  public personalities$ = this.store.select(
    PersonalitiesSelectors.personalitiesSelector
  );
  public errorMessage$ = this.store.select(
    PersonalitiesSelectors.errorMessageSelector
  );

  constructor(private store: Store<State>) {}

  public getPersonalities(personalityCodes: PersonalityCodeType[]) {
    this.store.dispatch(
      PersonalitiesActions.getPersonalities({ personalityCodes })
    );
  }
}
