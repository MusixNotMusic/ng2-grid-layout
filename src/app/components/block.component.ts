import { Component, AfterViewInit, ViewEncapsulation, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-block',
  template: `
    <div style="width:100%;
      height:calc(100% - 25px);
      background-color:cadetblue;
      box-sizing:border-box;
      z-index:2;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: default;">
    </div>
  `,
  // styleUrls: ['block.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BlockComponent implements AfterViewInit, OnInit {
  @Input() data;
  ngOnInit() {console.log('content Init'); }
  ngAfterViewInit() { console.log('content viewInit'); }
}
