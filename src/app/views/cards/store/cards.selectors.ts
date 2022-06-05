import { createSelector } from '@ngrx/store';
import { CardsFeature } from './cards.reducer';

export const { selectCards, selectSnackBar } = CardsFeature;

//export const selectFilteredCards = createSelector(

//);
