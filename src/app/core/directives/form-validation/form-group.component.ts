import { Component, ContentChildren, ElementRef, HostBinding, Input, OnInit, QueryList } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { DEFAULT_ERRORS, ErrorMessage } from './error-message';

@Component({
  selector: ".form-group",
  template: `
    <ng-content></ng-content>
    <span class="invalid-feedback" *ngFor="let message of messages()">{{ message }}</span>
    `,
  styles: [`
    span.invalid-feedback {
          display: block;
          margin: 0;
    }
    `
  ]
})
export class FormGroupComponent implements OnInit {

  @ContentChildren(FormControlName, { descendants: true })
  FormControlNames!: QueryList<FormControlName>;

  @Input() validationDisabled = false;

  @HostBinding("class.has-error")
  get hasErrors() {
    return (
      this.FormControlNames.some(c => (c.valid === null ? false : !c.valid) && (c.dirty === null ? false : c.dirty) && (c.touched === null ? false : c.touched)) &&
      !this.validationDisabled
    );
  }

  @HostBinding("class.has-success")
  get hasSuccess() {
    return (
      !this.FormControlNames.some(c => !c.valid) &&
      this.FormControlNames.some(c => (c.dirty === null ? false : c.dirty) && (c.touched === null ? false : c.touched)) &&
      !this.validationDisabled
    );
  }

  private errorMessages: ErrorMessage[] = DEFAULT_ERRORS;

  public messages = () => this.getMessages();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {}

  get label() {
    const label = this.elRef.nativeElement.querySelector("label");
    return label && label.textContent ? label.textContent.trim() : "Este campo";
  }

  get isDirtyAndTouched() {
    return this.FormControlNames.some(c => (c.dirty === null ? false : c.dirty) && (c.touched === null ? false : c.touched));
  }

  private getMessages(): string[] {
    const messages: string[] = [];
    if (!this.isDirtyAndTouched || this.validationDisabled) {
      return messages;
    }

    const names = this.FormControlNames.map(f => f.name);

    this.FormControlNames.filter((c, i) => !c.valid && !!c.errors && names.indexOf(c.name) === i).forEach(control => {
      if (control.errors) {
        Object.keys(control.errors).forEach(key => {
          const error = this.errorMessages.find(err => err.error === key);
          if (!error) { return; }
          messages.push(error.format!(this.label, control.errors![key]));
        });

      }
    });

    return messages;

  }

 
}
