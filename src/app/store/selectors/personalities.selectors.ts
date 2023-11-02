import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PersonalitiesState,
  personalitiesFeatureKey,
} from '../reducers/personalities.reducer';

export const personalitiesFeatureSelector =
  createFeatureSelector<PersonalitiesState>(personalitiesFeatureKey);

export const isLoadingSelector = createSelector(
  personalitiesFeatureSelector,
  (state: PersonalitiesState) => state.isLoading
);

export const personalitiesSelector = createSelector(
  personalitiesFeatureSelector,
  (state: PersonalitiesState) => state.personalities
);

export const errorMessageSelector = createSelector(
  personalitiesFeatureSelector,
  (state: PersonalitiesState) => state.errorMessage
);
