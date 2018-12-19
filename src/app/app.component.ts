import { Component, Input, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentComponent } from './components/content.component';
import { BlockComponent } from './components/block.component';
import { Block1Component } from './components/block1.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'app';

  @Input() child;

  public data = [
      // {'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0', 'componentData': {component: ContentComponent, data: {a: 1, b: 2}, auto: false}},
      // {'x': 2, 'y': 0, 'w': 2, 'h': 5, 'i': '1', 'componentData': {component: BlockComponent, data: {a: 1, b: 2}}, auto: false},
      // {'x': 4, 'y': 0, 'w': 4, 'h': 5, 'i': '2', 'componentData': {component: Block1Component, data: {a: 1, b: 2}}, auto: false},
      // {'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3', 'componentData': {component: ContentComponent, data: {a: 1, b: 2}}},
      // {'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4', 'componentData': {component: ContentComponent, data: {a: 1, b: 2}}},
      {'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0', 'componentData': {component: BlockComponent, data: {a: 1, b: 2}}, auto: false},
      {'x': 2, 'y': 0, 'w': 2, 'h': 4, 'i': '1', static: true},
      {'x': 4, 'y': 0, 'w': 4, 'h': 5, 'i': '2', 'componentData': {component: Block1Component, data: {a: 1, b: 2}}, auto: false},
      {'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3'},
      {'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4', 'componentData': {component: Block1Component, data: {a: 1, b: 2}}, auto: false},
      {'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5'},
      {'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6'},
      // {'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7'},
      // {'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8'},
      // {'x': 6, 'y': 4, 'w': 2, 'h': 4, 'i': '9'},
      // {'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10'},
      // {'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11'},
      // {'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12'},
      // {'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13'},
      // {'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14'},
      // {'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15'},
      // {'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16'},
      // {'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17'},
      // {'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18'},
      // {'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19'}
  ];

  public draggable = true;
  public resizable = true;
  public colNum =  12;
  public rowHeight = 40;
  public isDraggable = true;
  public isResizable = true;
  public verticalCompact = true;
  public useCssTransforms = true;
  public index = 0;
  public responsive = true;
  public nextId = 19;
  constructor(private _ngEle:  ElementRef) {
  }

  ngOnInit() {
  }

  onDragEvent(): void {
    // console.log('onDragEvent-----1111');
  }
  ngOnChanges(change:  SimpleChanges) {
  //   console.log('SimpleChanges',  change);
  }

  checkResponse() {
    this.responsive = !this.responsive;
  }

  checkDraggable() {
    this.draggable = !this.draggable;
  }

  checkResizable() {
    this.resizable = !this.resizable;
  }

  addItem() {
    // this.data.push({'x': 0, 'y': 0, 'w': 1, 'h': 1, 'i': '' + (++this.nextId), 'componentData': undefined});
    // this.data = JSON.parse(JSON.stringify(this.data));
  }
}
