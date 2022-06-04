export interface Movement {
  _id: string;
  type: MovementType;
  amount: number;
  title: string;
  description: string;
  cardId: string;
  timestamp: number;
}
export type MovementType = 'in' | 'out';
