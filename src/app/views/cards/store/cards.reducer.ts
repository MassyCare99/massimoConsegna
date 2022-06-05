import { createFeature, createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import {
  addCardsuccess,
  closeSnackbar,
  closeSnackbarSuccess,
  //closeSnackbar,
  getCardsSuccess,
  openSnackbar,
  openSnackbarSuccess,
  removeCardsuccess,
} from './cards.actions';

export interface snackBarStore {
  show: boolean;
  message: string;
}

export interface CardsState {
  Cards: Card[];
  snackBar: snackBarStore;
}

const initialState: CardsState = {
  Cards: [],
  snackBar: { show: false, message: '' },
};

export const CardsReducer = createReducer(
  initialState,
  on(getCardsSuccess, (state, action) => {
    return {
      ...state,
      Cards: action.Cards,
    };
  }),
  on(addCardsuccess, (state, action) => {
    return {
      ...state,
      Cards: [...state.Cards, action.Card],
      snackBar: { show: true, message: 'Carta Inserita con successo!' },
    };
  }),
  on(removeCardsuccess, (state, action) => {
    return {
      ...state,
      Cards: state.Cards.filter((r) => r._id !== action.id),
    };
  }),
  on(openSnackbarSuccess, (state, action) => {
    return {
      ...state,
      snackBar: { show: true, message: action.message },
    };
  }),
  on(closeSnackbarSuccess, (state, action) => {
    return {
      ...state,
      snackBar: { show: false, message: '' },
    };
  })
);

export const CardsFeature = createFeature({
  name: 'Cards',
  reducer: CardsReducer,
});
