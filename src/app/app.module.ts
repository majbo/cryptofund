import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionsComponent } from './positions/positions.component';

import { StaticData } from './static-data';
import { DataService } from './data-service.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PositionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [StaticData, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
