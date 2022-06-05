import { Card } from './../../../models/card';
import { Movement } from './../../../models/movement';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  getCardsSuccess,
  getMovementsSuccess,
  setCardSelect,
} from './movements.actions';

export interface MovementsState {
  cards: Card[];
  Movements: Movement[];
  total: number;
  selectedCardID: string;
}

const initialState: MovementsState = {
  cards: [],
  Movements: [],
  total: 0,
  selectedCardID: '',
};

export const MovementsReducer = createReducer(
  initialState,
  on(getMovementsSuccess, (state, action) => {
    let newMovement: Movement[];
    if (action.clear) {
      newMovement = action.Movements;
    } else {
      newMovement = [...state.Movements, ...action.Movements];
    }
    return {
      ...state,
      Movements: newMovement,
      total: action.total,
    };
  }),
  on(setCardSelect, (state, action) => {
    return {
      ...state,
      selectedCardID: action.idCard,
    };
  }),
  on(getCardsSuccess, (state, action) => {
    return {
      ...state,
      cards: action.Cards,
    };
  })
);

export const MovementsFeature = createFeature({
  name: 'Movements',
  reducer: MovementsReducer,
});
