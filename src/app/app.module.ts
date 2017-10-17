import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PositionsComponent } from './positions/positions.component';
import { ChartComponent } from './chart/chart.component';

import { StaticData } from './static-data';
import { DataService } from './data-service.service';
import { PositionService } from './position-service.service';
import { ChartService } from './chart-service.service';

@NgModule({
  declarations: [
    AppComponent,
    PositionsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ChartsModule
  ],
  providers: [StaticData, DataService, PositionService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
