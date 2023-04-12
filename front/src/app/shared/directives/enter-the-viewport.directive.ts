import { AfterViewInit, Directive, ElementRef, EventEmitter, Host, OnDestroy, Output } from '@angular/core';

/**
 * Directive for listen when attached element appears on screen,
 * Emit true when IntersectionObserver observe element
 */
@Directive({
  selector: '[appEnterTheViewport]'
})
export class EnterTheViewportDirective implements AfterViewInit, OnDestroy {
  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  observer: IntersectionObserver;

  constructor(@Host() private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0
    };

    this.observer = new IntersectionObserver(this.callback, options);
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(({ isIntersecting }) => {
      if (isIntersecting) {
        this.visibilityChange.emit(true);
      }
    });
  };
}

