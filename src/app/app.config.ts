import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LayoutsModule } from './shared/layouts/layouts.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(CommonModule,SharedModule,  LayoutsModule, HttpClientModule, ModalModule.forRoot()),
    provideRouter(routes),

  ]
};