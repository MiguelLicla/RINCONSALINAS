import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationDirective } from './form-validation.directive';
import { FormControlDirective } from './form-control.directive';
import { FormGroupComponent } from './form-group.component';





@NgModule({
  declarations: [
    FormValidationDirective,
    FormControlDirective,
    FormGroupComponent
  ],
  imports: [
    CommonModule, 
  ],
  exports: [
    FormValidationDirective,
    FormControlDirective,
    FormGroupComponent
  ]
})
export class FormValidationModule { }
