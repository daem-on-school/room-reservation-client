import { NgModule } from '@angular/core';
import { ApiModule, EventService, BASE_PATH } from '../api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: 'http://localhost:5025' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }