import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[mayusculas]',
  host: {
    '(input)': '$event'
  }
})
export class MayusculasDirective {

  @Input()
  desactivar: boolean;
  lastValue: string;

  constructor(public ref: ElementRef) {
    this.desactivar = false;
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {

    if(this.desactivar){
      return;
    }
    var start = $event.target.selectionStart;
    var end = $event.target.selectionEnd;
    $event.target.value = $event.target.value.toUpperCase();
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();

    if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
      this.lastValue = this.ref.nativeElement.value = $event.target.value;
      // Propagation
      const evt = new InputEvent('input');
      $event.target.dispatchEvent(evt);
    }

  }

}
