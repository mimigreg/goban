import { PositionModel } from './position.model';

export interface GobanModel {
  grille: Array<Array<PositionModel>>;
  horizontales: number;
  verticales: number;
}
