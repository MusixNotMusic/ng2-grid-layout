import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[flag]'
})
export class FlagDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    public _ngEl: ElementRef
    ) { }
}
