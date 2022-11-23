import { NgModule } from '@angular/core';
import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '../api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';
import { CreateEventComponent } from './create/event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';


export function apiConfigFactory (): Configuration {
  const params: ConfigurationParameters = {
    withCredentials: true,
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EventComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: BASE_PATH, useValue: 'http://localhost:5025' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }