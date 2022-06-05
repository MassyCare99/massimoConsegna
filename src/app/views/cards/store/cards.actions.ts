import { Card } from './../../../models/card';
import { createAction, props } from '@ngrx/store';
import { CardForm } from 'src/app/models/CardForm';

/**
 * GET
 */
export const getCards = createAction('[Cards] get');

export const getCardsSuccess = createAction(
  '[Cards] get success',
  props<{ Cards: Card[] }>()
);

export const getCardsFail = createAction('[Cards] get fail');

/**
 * ADD
 */
export const addCard = createAction('[Cards] add', props<{ card: CardForm }>());

export const addCardsuccess = createAction(
  '[Cards] add success',
  props<{ Card: Card }>()
);

export const addCardFail = createAction('[Cards] add fail');

/**
 * REMOVE
 */
export const removeCard = createAction(
  '[Cards] remove',
  props<{ id: string }>()
);

export const removeCardsuccess = createAction(
  '[Cards] remove success',
  props<{ id: string }>()
);

export const removeCardFail = createAction('[Cards] remove fail');

/**
 * SNACKBAR
 */
export const openSnackbar = createAction(
  '[Snackbar] open',
  props<{ message: string }>()
);
export const openSnackbarSuccess = createAction(
  '[Snackbar] openSuccess',
  props<{ message: string }>()
);

export const closeSnackbar = createAction('[Snackbar] close');
export const closeSnackbarSuccess = createAction('[Snackbar] closeSuccess');
