import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Ng2GridLayoutModule } from '../../projects/grid-layout/src/main.module';
import { ContentComponent } from './components/content.component';
import { BlockComponent } from './components/block.component';
import { Block1Component } from './components/block1.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    BlockComponent,
    Block1Component,
  ],
  imports: [
    BrowserModule,
    Ng2GridLayoutModule
  ],
  entryComponents: [ContentComponent, BlockComponent, Block1Component],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
