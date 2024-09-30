import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { internerErrorInterceptor } from './core/interceptors/interner-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor,internerErrorInterceptor]
))]
};
