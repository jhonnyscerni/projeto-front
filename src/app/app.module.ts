import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {TagInputModule} from 'ngx-chips';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './@core/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './@core/layouts/auth-layout/auth-layout.component';
import {PresentationModule} from './pages/presentation/presentation.module';

import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './@core/components/components.module';
import {SharedModule} from './@core/shared/shared.module';
import {ErrorInterceptor} from './@core/shared/services/interceptors/error.handler.service';
import {AuthInterceptor} from './@core/shared/services/interceptors/auth.interceptor';

import {TextMaskModule} from 'angular2-text-mask';
import {NgBrazil} from 'ng-brazil'

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

registerLocaleData(localePt)

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    SharedModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),

    // Validation
    TextMaskModule,
    NgBrazil,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt-BR' },],

  bootstrap: [AppComponent]
})
export class AppModule {}
