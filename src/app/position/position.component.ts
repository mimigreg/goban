import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PositionModel } from '../model/position.model';

@Component({
  selector: 'goban-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  @Input()
  positionModel: PositionModel;

  @Output() positionClicked: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  poseUnPion(blanc: boolean): boolean {
    if (! this.positionModel.occupation) {
      this.positionModel.occupation = blanc;
      return true;
    } else {
      return false;
    }
  }

  retireUnPion() {
    if (this.positionModel.occupation) {
      this.positionModel.occupation = undefined;
      return true;
    } else {
      return false;
    }
  }

  clicked() {
    this.positionClicked.emit(this.positionModel);
  }
}
