import { Movement } from './../../../models/movement';
import { Card } from './../../../models/card';
import { createAction, props } from '@ngrx/store';

/**
 * GET
 */
export const getMovements = createAction(
  '[Movements] get',
  props<{ clear: boolean }>()
);

export const getMovementsSuccess = createAction(
  '[Movements] get success',
  props<{ Movements: Movement[]; clear: boolean; total: number }>()
);

export const getMovementsFail = createAction('[Movements] get fail');

export const setCardSelect = createAction(
  '[Movements] set card',
  props<{ idCard: string }>()
);

export const moreMovements = createAction('[Movements] more movement');

/**
 * GET
 */
export const getCards = createAction('[Cards] get');

export const getCardsSuccess = createAction(
  '[Cards] get success',
  props<{ Cards: Card[] }>()
);

export const getCardsFail = createAction('[Cards] get fail');
