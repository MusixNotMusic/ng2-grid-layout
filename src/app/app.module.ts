import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2GridLayoutModule } from '../../projects/grid-layout/src/main.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2GridLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
