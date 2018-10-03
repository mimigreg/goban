import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GobanModel} from '../model/goban.model';
import { PositionModel } from '../model/position.model';

@Component({
  selector: 'goban-goban',
  templateUrl: './goban.component.html',
  styleUrls: ['./goban.component.css']
})
export class GobanComponent implements OnInit {

  @Input()
  goban: GobanModel;

  @Output() gobanClicked: EventEmitter<any> = new EventEmitter();

  protected tour = false;

  constructor() { }

  ngOnInit() {
    if (this.goban.grille.length !== this.goban.verticales) {
      this.goban.grille = [];
      for (let v = 0; v < this.goban.verticales; v++) {
        const ligne = [];
        for (let h = 0; h < this.goban.horizontales; h++) {
          const position = {
            haut: v === 0,
            bas: v === (this.goban.verticales - 1),
            gauche: h === 0,
            droite: h === (this.goban.horizontales - 1),
            hoshi: (h === 3 || h === 15 || h === 9) && ( v === 3 || v === 15 || v === 9),
            h: h,
            v: v,
            occupation: undefined,
            appartientAuxBlancs: undefined
          };
          ligne.push(position);
        }
        this.goban.grille.push(ligne);
      }
    }
  }

  remonte(position: PositionModel) {
    this.gobanClicked.emit(position);
  }
}
