import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[lowercase]'
})
export class LowercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = input.value.toLowerCase();
    input.setSelectionRange(start, end);
  }
}

