import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'guide-button',
  template: `
    <button
      [ngClass]="'gd-button-' + type + ' gd-button-' + type + '__' + color + ' ' + size"
      type="button"
      [disabled]="disabled"
    >
      {{ label }}
      <ng-content></ng-content>
    </button>
  `,
  encapsulation: ViewEncapsulation.None
})
export class GuideButtonComponent {
  @Input() label?: string;

  @Input() type: string = 'primary';

  @Input() color: string = 'primary';

  @Input() disabled: boolean = false;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor() {
    // not to do
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
