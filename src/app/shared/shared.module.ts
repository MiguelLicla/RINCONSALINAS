import { NgModule } from '@angular/core';
import { LayoutsModule } from './layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
