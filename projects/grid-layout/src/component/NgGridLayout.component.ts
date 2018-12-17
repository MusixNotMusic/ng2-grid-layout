import { OnInit, SimpleChanges, OnChanges, Component, AfterViewInit, ElementRef, Input} from '@angular/core';
import {bottom, compact, getLayoutItem, moveElement, validateLayout, cloneLayout} from '../helpers/utils';
import {addWindowEventListener, removeWindowEventListener} from '../helpers/domUtils';
import {getBreakpointFromWidth, getColsFromBreakpoint, findOrGenerateResponsiveLayout } from '../helpers/responsiveUtils';
import * as elementResizeDetectorMaker_ from 'element-resize-detector';
import { EventService } from '../service/event.service';
const elementResizeDetectorMaker = elementResizeDetectorMaker_;
@Component({
  selector: 'app-grid-layout',
  templateUrl: 'NgGridLayout.component.html',
  styleUrls: ['NgGridLayout.component.css']
})

export class NgGridLayoutComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() public autoSize = true;
  @Input() public colNum = 12;
  @Input() public rowHeight = 10;
  @Input() public maxRows = Infinity;
  @Input() public margin = [10, 10];
  @Input() public isDraggable = true;
  @Input() public isResizable = true;
  @Input() public isMirrored = false;
  @Input() public useCssTransforms = true;
  @Input() public verticalCompact = true;
  @Input() public layout: Array<any>;
  @Input() responsive = false;
  @Input() breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  @Input() cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  // @Output() addGrid: EventEmitter<any> = new EventEmitter();
  public width = null;
  public mergedStyle = {};
  public lastLayoutLength = 0;
  public isDragging = false;
  public placeholder = {x: 0, y: 0, w: 0, h: 0, i: -1 };
  public layouts = {};
  public lastBreakpoint = null;
  public originalLayout = null;
  constructor(private _ngEl: ElementRef, private eventService: EventService) {}

  ngOnInit() {
    this.eventService._event.on('resizeEvent', this.resizeEventHandler, this);
    this.eventService._event.on('dragEvent', this.onDragEventHandler, this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['width']) {
      this.eventService._event.emit('updateWidth', changes['width'].currentValue);
      this.updateHeight();
    }

    if (changes['colNum']) {
      this.eventService._event.emit('setColNum', changes['colNum'].currentValue);
    }
    if (changes['rowHeight']) {
      this.eventService._event.emit('setRowHeight', changes['rowHeight'].currentValue);
    }
    if (changes['isDraggable']) {
      this.eventService._event.emit('setDraggable', changes['isDraggable'].currentValue);
    }
    if (changes['isResizable']) {
      this.eventService._event.emit('setResizable', changes['isResizable'].currentValue);
    }
    if (changes['responsive']) {
      this.onWindowResize();
    }
  }

  ngAfterViewInit() {
    validateLayout(this.layout, undefined);
    this.originalLayout = this.layout;
    window.setTimeout(() => {
        if (this.width === null) {
            this.onWindowResize.call(this);
            this.initResponsiveFeatures();
            addWindowEventListener('resize', this.onWindowResize.bind(this));
        }
        compact(this.layout, this.verticalCompact);
        this.updateHeight();
        window.setTimeout(() => {
            const erd = elementResizeDetectorMaker({
                strategy: 'scroll' // <- For ultra performance.
            });
            erd.listenTo(this._ngEl.nativeElement.children[0], this.onWindowResize.bind(this));
        });
    });
    addWindowEventListener('load', this.onWindowLoad.bind(this) );
  }

  public resizeEventHandler(eventName, id, x, y, w, h) {
    this.resizeEvent(eventName, id, x, y, w, h);
  }

  public onDragEventHandler(eventName, id, x, y, w, h) {
    this.dragEvent(eventName, id, x, y, w, h);
  }

  // 滚动条 和 resize 需要重写
  public onWindowLoad(): any {
    if (this.width === null) {
        this.onWindowResize();
        addWindowEventListener('resize', this.onWindowResize);
    }
    compact(this.layout, this.verticalCompact);
    this.updateHeight();
    window.setTimeout(() => {
      const erd = elementResizeDetectorMaker({
          strategy: 'scroll' // <- For ultra performance.
      });
      erd.listenTo(this._ngEl.nativeElement.children[0], this.onWindowResize.bind(this));
    });
  }

  public layoutUpdate() {
    if (this.layout !== undefined) {
        if (this.originalLayout && this.layout.length !== this.originalLayout.length) {
            // console.log("### LAYOUT UPDATE!", this.layout.length, this.originalLayout.length);

            const diff = this.findDifference(this.layout, this.originalLayout);
            if (diff.length > 0) {
                // console.log(diff);
                if (this.layout.length > this.originalLayout.length) {
                    this.originalLayout = this.originalLayout.concat(diff);
                } else {
                    this.originalLayout = this.originalLayout.filter(obj => {
                        return !diff.some(obj2 => {
                            return obj.i === obj2.i;
                        });
                    });
                }
            }

            this.lastLayoutLength = this.layout.length;
            this.initResponsiveFeatures();
        }

        compact(this.layout, this.verticalCompact);
        this.eventService._event.emit('updateWidth', this.width);
        // this.updateWidth.emit(this.width);
        this.updateHeight();
    }
  }

  public updateHeight() {
    this.mergedStyle = {
        height: this.containerHeight()
    };
  }

  public onWindowResize(): any {
    if (this._ngEl !== null && this._ngEl.nativeElement !== null) {
      this.width = this._ngEl.nativeElement.children[0].offsetWidth;
    }
    this.eventService._event.emit('setColNum', this.colNum);
    if (this.responsive) {
      this.responsiveGridLayout();
      this.eventService._event.emit('updateWidth', this.width);
      this.eventService._event.emit('compact');
    } else {
      this.eventService._event.emit('updateWidth', this.width);
      this.eventService._event.emit('compact');
      this.updateHeight();
      compact(this.layout, this.verticalCompact);
    }
  }

  public containerHeight() {
    if (!this.autoSize) { return; }
        // tslint:disable-next-line:max-line-length
        return bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px';
  }

  public dragEvent(eventName, id, x, y, w, h) {
    if ( eventName === 'dragmove' || eventName === 'dragstart') {
      this.placeholder.i = id;
      this.placeholder.x = x;
      this.placeholder.y = y;
      this.placeholder.w = w;
      this.placeholder.h = h;
      this.isDragging = true;
    } else {
      this.isDragging = false;
    }
    // console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
    // console.log('eventObj.id', eventObj.id);
    let l = getLayoutItem(this.layout, id);
    // GetLayoutItem sometimes returns null object
    if (l === undefined || l === null) {
        l = {x: 0, y: 0};
    }
    l.x = x;
    l.y = y;
    // Move the element to the dragged location.
    // const now = Date.now();
    this.layout = moveElement(this.layout, l, x, y, true);
    compact(this.layout, this.verticalCompact);
    // needed because vue can't detect changes on array element properties
    // this.compact.emit();
    // 修改样式
    this.eventService._event.emit('compact');
    this.updateHeight();
  }
  // layout 重置 窗口大小
  public resizeEvent(eventName, id, x, y, w, h) {
    if ( eventName === 'resizestart' || eventName === 'resizemove') {
      this.placeholder.i = id;
      this.placeholder.x = x;
      this.placeholder.y = y;
      this.placeholder.w = w;
      this.placeholder.h = h;
      window.setTimeout(() => {
          this.isDragging = true;
      });
      // this.$broadcast("updateWidth", this.width);
      // this.updateWidth.emit(this.width);
      this.eventService._event.emit('updateWidth', this.width);
    } else {
        window.setTimeout(() => {
            this.isDragging = false;
        });
    }
    // console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
    let l = getLayoutItem(this.layout, id);
    // GetLayoutItem sometimes returns null object
    if (l === undefined || l === null) {
        l = {h: 0, w: 0};
    }
    l.h = h;
    l.w = w;

    compact(this.layout, this.verticalCompact);
    this.eventService._event.emit('updateWidth', this.width);
    this.eventService._event.emit('compact');
    this.updateHeight();
  }

  public responsiveGridLayout() {
    console.log('responsiveGridLayout');
    const newBreakpoint = getBreakpointFromWidth(this.breakpoints, this.width);
    const newCols = getColsFromBreakpoint(newBreakpoint, this.cols);
    this.eventService._cols = newCols;
    // this.eventService._event.emit('setColNum', newCols);
    console.log(newBreakpoint, newCols, this.layouts, this.lastBreakpoint);
    // save actual layout in layouts
    if (this.lastBreakpoint != null && !this.layouts[this.lastBreakpoint]) {
        this.layouts[this.lastBreakpoint] = cloneLayout(this.layout);
    }
    // Find or generate a new layout.
    const layout = findOrGenerateResponsiveLayout(
        this.originalLayout,
        this.layouts,
        this.breakpoints,
        newBreakpoint,
        this.lastBreakpoint,
        newCols,
        this.verticalCompact
    );
    // Store the new layout.
    if (layout && layout.length > 0) {
      // console.log('this.originalLayout ==>', this.originalLayout, layout, this.breakpoints, layout === this.originalLayout);
      this.layouts[newBreakpoint] = layout;
      // this.layout = layout;
      // [Note]: 如果添加layout时候， layout 与this.layout length 大小不对等
      for (let i = 0; i < this.layout.length; i++) {
        if (!layout[i]) { continue; }
        this.layout[i].x = layout[i].x;
        this.layout[i].y = layout[i].y;
        this.layout[i].w = layout[i].w;
        this.layout[i].h = layout[i].h;
        this.layoutUpdate();
      }
    }
    // new prop sync
    // this.$emit('update:layout', layout);
    // if (layout && layout.length > 0) {
    //   this.layout = layout;
    // }
    // copyLL(this.layout, layout);
    // this.layoutUpdate();

    this.lastBreakpoint = newBreakpoint;
    this.eventService._event.emit('setColNum', getColsFromBreakpoint(newBreakpoint, this.cols));
  }

  public initResponsiveFeatures() {
    this.layouts = [];
  }

  public findDifference(layout, originalLayout): any {
      // Find values that are in result1 but not in result2
      const uniqueResultOne = layout.filter(function(obj) {
        return !originalLayout.some(function(obj2) {
            return obj.i === obj2.i;
        });
      });

      // Find values that are in result2 but not in result1
      const uniqueResultTwo = originalLayout.filter(function(obj) {
          return !layout.some(function(obj2) {
              return obj.i === obj2.i;
          });
      });

      // Combine the two arrays of unique entries#
      return uniqueResultOne.concat(uniqueResultTwo);
  }
}
