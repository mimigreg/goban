import { Component, OnInit, Input } from '@angular/core';
import { PartieModel } from '../model/partie.model';

@Component({
  selector: 'goban-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  @Input()
  partie: PartieModel;

  constructor() { }

  ngOnInit() {
  }

}
