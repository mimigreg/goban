import { GobanModel } from './goban.model';

export interface PartieModel {
  goban: GobanModel;
  auxBlancsDeJouer: boolean;
  historique: Array<string>;
  capturesBlanc: number;
  capturesNoir: number;
}
