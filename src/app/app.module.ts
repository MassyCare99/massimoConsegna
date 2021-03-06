import { CoreModule } from './core/core.module';
import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalYesNoComponent } from './views/modal-yes-no/modal-yes-no.component';

import { DatePipe } from '@angular/common';
import { LoginModule } from './views/login/login.module';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CardsReducer } from './views/cards/store/cards.reducer';

@NgModule({
  declarations: [AppComponent, ModalYesNoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    HttpClientModule,
    CoreModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    StoreModule.forRoot({
      //Cards: CardsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
    }),
    EffectsModule.forRoot([]),
  ],
  exports: [HttpClientModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
