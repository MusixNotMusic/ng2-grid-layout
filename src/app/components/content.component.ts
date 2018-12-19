import { Component, AfterViewInit, ViewEncapsulation, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-content-test',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContentComponent implements AfterViewInit, OnInit {
  @Input() data;
  ngOnInit() {console.log('content Init'); }
  ngAfterViewInit() { console.log('content viewInit'); }
}
