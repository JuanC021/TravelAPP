import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeTravelComponent } from './pages/home-travel/home-travel.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InfoTravelComponent } from './pages/info-travel/info-travel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeTravelComponent,
    InfoTravelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
