import { Injectable } from '@angular/core';
import { PositionModel } from './model/position.model';

@Injectable({
  providedIn: 'root'
})
export class ReglesService {

  constructor() { }

  public droitDePoser(candidat: PositionModel,
                      grille: Array<Array<PositionModel>>,
                      auTourDesBlancs: boolean, historique: Array<string>): Array<PositionModel> {
    const pionCandidat: PositionModel = Object.assign({occupation: auTourDesBlancs}, candidat);
    pionCandidat.occupation = auTourDesBlancs;

    // Il y a déjà un pion
    if (grille[pionCandidat.v][pionCandidat.h].occupation !== undefined) {
      return undefined;
    }

    // Règle du tourne en rond
    const prises = this.detecteLesCaptures(pionCandidat, grille, auTourDesBlancs);

    if (historique[0] === this.signature(grille, pionCandidat, auTourDesBlancs, prises)) {
      return undefined;
    }

    // Priorité à la prise
    if (prises.length > 0) {
      return prises;
    }
    // Règle du 0 degré de liberté de la chaine
    const chaineEnCours = this.detecteChaine(pionCandidat, grille);
    console.log('chaine :', chaineEnCours.length);
    if (this.degreLiberteChaine(chaineEnCours, grille, pionCandidat) === 0) {
      return undefined;
    }

    // Sinon, t'as le droit mais pas de prise
    return [];
  }

  public detecteChaine(position: PositionModel,
                       grille: Array<Array<PositionModel>>,
                       chaineEnCours?: Array<PositionModel>): Array<PositionModel> {
    // Init d'une nouvelle chaine ou récup. de la chaine en cours
    let chaine: Array<PositionModel> = [];
    if (chaineEnCours) {
      chaine = chaine.concat(chaineEnCours);
    }
    // Si la position n'est pas déjà dans la chaine, on l'ajoute
    if (!this.estPresent(position, chaine)) {
      chaine.push(position);
    }

    // On regarde autours
    const autour = this.positionsAutour(position, grille);

    for (const voisin of autour) {
      if (voisin !== undefined) {
        if (!this.estPresent(voisin, chaine)) {
          if (voisin.occupation === position.occupation) {
            chaine = this.detecteChaine(voisin, grille, chaine);
          }
        }
      }
    }

    return chaine;
  }

  private positionsAutour(position: PositionModel, grille: Array<Array<PositionModel>>): Array<PositionModel> {
    const autour: Array<PositionModel> = [];
    if (position.h < (grille[0].length - 1)) {autour.push(grille[position.v][position.h + 1]); }
    if (position.h > 0) {autour.push(grille[position.v][position.h - 1]); }
    if (position.v < (grille.length - 1)) {autour.push(grille[position.v + 1][position.h]); }
    if (position.v > 0 ) {autour.push(grille[position.v - 1][position.h]); }
    return autour;
  }

  private estPresent(position: PositionModel, chaine: Array<PositionModel>): boolean {
    if (position === undefined) {return undefined; }
    if (chaine === undefined) {return undefined; }
    return chaine.find((element) => {
      return position.h === element.h && position.v === element.v;
    }) !== undefined;
  }

  private memePlace(position1: PositionModel, position2: PositionModel): boolean {
    if (!position1 || !position2) {return undefined; }
    return position1.h === position2.h && position1.v === position2.v;
  }

  public signature(grille: Array<Array<PositionModel>>,
                   positionCandidate?: PositionModel, candidatEstBlanc?: boolean, prises?: Array<PositionModel>): string {
    let signature = '';
    for (const ligne of grille) {
      for (const position of ligne) {
        if (this.memePlace(position, positionCandidate)) {
          signature += candidatEstBlanc ? 'w' : 'b';
        } else {
          if (position.occupation === undefined) {
            signature += ' ';
          } else {
            if (this.estPresent(position, prises)) {
              signature += ' ';
            } else {
              signature += position.occupation ? 'w' : 'b';
            }
          }
        }
      }
    }
    return signature;
  }

  public degreLiberteChaine(chaine: Array<PositionModel>, grille: Array<Array<PositionModel>>, candidat?: PositionModel): number {
    let compteur = 0;
    for (const position of chaine) {
      const autour = this.positionsAutour(position, grille);
      for (const voisin of autour) {
        if (!candidat || !this.memePlace(candidat, voisin)) {
          if (voisin.occupation === undefined && !(this.estPresent(voisin, chaine))) {compteur++; }
        }
      }
    }
    return compteur;
  }

  public detecteLesCaptures(candidat: PositionModel, grille: Array<Array<PositionModel>>, auTourDesBlancs: boolean): Array<PositionModel> {
    let chaineCapturee: Array<PositionModel> = [];
    const pionCandidat: PositionModel = Object.assign({occupation: auTourDesBlancs}, candidat);
    pionCandidat.occupation = auTourDesBlancs;
    const autour = this.positionsAutour(pionCandidat, grille);
    for (const voisin of autour) {
      if (voisin.occupation === !auTourDesBlancs) {
        const chaineAdverse = this.detecteChaine(voisin, grille);
        if (this.degreLiberteChaine(chaineAdverse, grille, candidat) === 0) {
          chaineCapturee = chaineCapturee.concat(chaineAdverse);
        }
      }
    }
    return chaineCapturee;
  }

  public calculeLesTerritoires(): Array<Array<PositionModel>> {
    return undefined;
  }
}
