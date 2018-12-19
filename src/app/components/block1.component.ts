import { Component, AfterViewInit, ViewEncapsulation, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-block1',
  template: `
    <div class="bash skew-line">
    </div>
  `,
  styleUrls: ['block1.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class Block1Component implements AfterViewInit, OnInit {
  @Input() data;
  ngOnInit() {console.log('content Init'); }
  ngAfterViewInit() { console.log('content viewInit'); }
}
