import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgGridItemComponent } from './component/NgGridItem.component';
import { NgGridLayoutComponent } from './component/NgGridLayout.component';
import { EventService } from './service/event.service';
import { FlagDirective } from './directives/flag.directive';

@NgModule({
  declarations: [ NgGridItemComponent, NgGridLayoutComponent, FlagDirective],
  // entryComponents:  [ NgGridPlaceholder ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [EventService],
  exports: [ NgGridItemComponent, NgGridLayoutComponent, FlagDirective]
})
export class Ng2GridLayoutModule {}
