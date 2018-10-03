import { Component, OnInit} from '@angular/core';
import { PartieModel } from './model/partie.model';
import { PositionModel } from './model/position.model';
import { ReglesService } from './regles.service';

@Component({
  selector: 'goban-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  partie: PartieModel;

  constructor(private regles: ReglesService) {

  }

  ngOnInit() {
    this.partie = {
      goban : {
        grille: [],
        horizontales: 19,
        verticales: 19
      },
      historique: [],
      auxBlancsDeJouer: false,
      capturesBlanc: 0,
      capturesNoir: 0
    };
  }

  pose(position: PositionModel) {
    const okEtCaptures = this.regles.droitDePoser(position, this.partie.goban.grille, this.partie.auxBlancsDeJouer, this.partie.historique);
    if (okEtCaptures) {
      for (const positionDePrise of okEtCaptures) {
        // On retire le pion
        this.partie.goban.grille[positionDePrise.v][positionDePrise.h].occupation = undefined;
        // On compte la prise
        if (this.partie.auxBlancsDeJouer) {
          this.partie.capturesNoir ++;
        } else {
          this.partie.capturesBlanc ++;
        }
      }
      // on pose son pion
      this.partie.goban.grille[position.v][position.h].occupation = this.partie.auxBlancsDeJouer;
      // on historise
      this.partie.historique.push(this.regles.signature(this.partie.goban.grille));
      if (this.partie.historique.length > 2) {this.partie.historique.shift(); }
      // Tour suivant
      this.partie.auxBlancsDeJouer = !this.partie.auxBlancsDeJouer;
    }
  }

  passer() {
    this.partie.auxBlancsDeJouer = !this.partie.auxBlancsDeJouer;
}
