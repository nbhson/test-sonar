import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { slideshowAnimation } from './slideshow.animations';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  animations: [slideshowAnimation],
})
export class SlideShowComponent implements OnInit {
  @ViewChild('previous', { static: true }) previous: any;
  @ViewChild('next', { static: true }) next: any;
  position: any;
  images: string[] = [
    'https://cf.shopee.vn/file/2df4f7f9a4de74b680b24e2ab17fcdac_xxhdpi',
    'https://cf.shopee.vn/file/2791aafe2ba107f862815d6dba1f70e1_xxhdpi',
    'https://cf.shopee.vn/file/ac0ca751c739487a14ab22024b5a47ff_xxhdpi',
  ];
  currentIndex = 0;
  currentDirection = 'left';

  constructor() {}

  ngOnInit() {
    const previous$ = fromEvent(this.getNativeElement(this.previous), 'click').pipe(
      map((event) => ({ shift: -1, direction: 'right' })),
    );

    const next$ = fromEvent(this.getNativeElement(this.next), 'click').pipe(
      map((event) => ({ shift: +1, direction: 'left' })),
    );

    merge(previous$, next$)
      .pipe(
        startWith({ index: 0 } as any),
        scan((acc, curr) => {
          const projectedIndex = acc.index + curr.shift;

          const adjustedIndex =
            projectedIndex < 0 ? this.images.length - 1 : projectedIndex >= this.images.length ? 0 : projectedIndex;

          return { index: adjustedIndex, direction: curr.direction };
        }),
      )
      .subscribe((event) => {
        this.currentIndex = event.index;
        this.currentDirection = event.direction;
      });
  }

  getNativeElement(element: any) {
    return element._elementRef.nativeElement;
  }
}
