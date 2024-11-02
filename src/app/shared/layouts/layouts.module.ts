import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { VerticalComponent } from './vertical/vertical.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { FieldFilterPipe } from "../../core/pipes/field-filter.pipe";



@NgModule({
  declarations: [
    LayoutComponent,
    LayoutAuthComponent,
    VerticalComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FieldFilterPipe
],
  exports:[
    BrowserAnimationsModule,
    RouterModule,
    CollapseModule,
  ]
})
export class LayoutsModule { }
