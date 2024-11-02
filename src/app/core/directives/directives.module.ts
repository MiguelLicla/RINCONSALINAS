import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationModule } from './form-validation/form-validation.module';
import { LowercaseDirective } from './lowercase.directive ';


@NgModule({
  declarations: [
    LowercaseDirective
  ],
  imports: [
    CommonModule,
    FormValidationModule

  ],
  exports: [
    FormValidationModule,
    LowercaseDirective
  ]
})
export class DirectivesModule { }
