import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordShown]',
  exportAs: 'appPassword',
})
export class ShowPasswordDirective {
  @HostBinding('type') @Input() public type!: 'text' | 'password';
  public isPasswordShown: boolean = false;

  public toggleInputType() {
    this.isPasswordShown = !this.isPasswordShown;
    this.type = this.isPasswordShown ? 'text' : 'password';
  }
}
