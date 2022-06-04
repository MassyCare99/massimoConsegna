import { cardType } from './card';

export interface CardForm {
  _id: string;
  type: cardType;
  surname: string;
  name: string;
  number: string;
  csc: string;
}
