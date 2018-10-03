import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GobanComponent } from './goban/goban.component';
import { PositionComponent } from './position/position.component';
import { CommandesComponent } from './commandes/commandes.component';

@NgModule({
  declarations: [
    AppComponent,
    GobanComponent,
    PositionComponent,
    CommandesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
