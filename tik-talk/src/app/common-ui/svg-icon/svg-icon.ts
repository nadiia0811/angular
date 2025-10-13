import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: `
    <svg width="16" height="16" viewBox="0 0 16 16">
      <use [attr.href]="href"></use>
    </svg>
  `, 
  styles: ['']
})
export class SvgIcon {
  @Input() icon: string = ''

  get href() {
    return `/assets/images/icons.svg#${this.icon}`;
  }
}
