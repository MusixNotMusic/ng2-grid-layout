import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgGridItemComponent } from './component/NgGridItem.component';
import { NgGridLayoutComponent } from './component/NgGridLayout.component';
import { EventService } from './service/event.service';

@NgModule({
  declarations: [ NgGridItemComponent, NgGridLayoutComponent],
  // entryComponents:  [ NgGridPlaceholder ],
  imports:[
    CommonModule,
    FormsModule
  ],
  providers: [EventService],
  exports: [ NgGridItemComponent, NgGridLayoutComponent]
})
export class Ng2GridLayoutModule {}
