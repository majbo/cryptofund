import { StaticData } from "./static-data";
import { DataService } from "./data-service.service";
import { IChartData } from "./ichart-data";
import { Injectable } from "@angular/core";
import { IChartDataPoint } from "./ichart-data-point";

import * as moment from 'moment';


@Injectable()
export class ChartService {
  
  constructor(private StaticData: StaticData, private DataService: DataService) { }

  public GetChartData(): Promise<IChartData[]> {
    let promises = [];
    let positions = this.StaticData.GetCoinPositions();

    for (let position of positions) {
      promises.push(this.GetChartDataPoints(position.Key, position.Quantity).then(dataPoints => {
        return {
          Key: position.Key,
          DataPoints: dataPoints
        };
      }));
    }
   
    return Promise.all(promises);
  }

  private GetChartDataPoints(currency: string, quantity: number) : Promise<IChartDataPoint[]> {
    let promises = [];
    let momentDate = moment(this.StaticData.GetStartDate());
    const now = moment();

    while (momentDate.isBefore(now)) {
      let date = momentDate.toDate();
      promises.push(this.getChartDataPoint(currency, quantity, date));
      momentDate.add(1, "d");
    }

    return Promise.all(promises).then(dataPoints => {
        return dataPoints.sort(this.sortChartDataPoints);
    });
  }

  private sortChartDataPoints(point1: IChartDataPoint, point2: IChartDataPoint) {
    if (point1.t > point2.t) {
      return 1;
    }
    if (point1.t < point2.t){
      return -1;
    }
    return 0;
  }

  private getChartDataPoint(currency: string, quantity: number, date: Date) : Promise<IChartDataPoint> {
    return this.DataService.getHistoricalValue(currency, date).then(value => {
      return this.DataService.getExchangeRate(date).then(exchangeRate => {
        return {
          t: date,
          y: value * quantity * exchangeRate
        };
      });
    });
  }

  // private getCurrentValue(currency: string) : Promise<number>{
  //   switch(currency) {
  //       case "BTC":
  //           return Promise.resolve(3733.47);
  //       case "ETH":
  //           return Promise.resolve(229.78);
  //       case "XRP":
  //           return Promise.resolve(0.17); 
  //       case "LTC":
  //           return Promise.resolve(48.53); 
  //   }
  // }

  // private getExchangeRate(date?: Date) : Promise<number>{
  //   return Promise.resolve(1.1457);
  // }

  // private getHistoricalValue(currency: string, date: Date){
  //   switch(currency) {
  //       case "BTC":
  //           return Promise.resolve(3733.47);
  //       case "ETH":
  //           return Promise.resolve(229.78);
  //       case "XRP":
  //           return Promise.resolve(0.17); 
  //       case "LTC":
  //           return Promise.resolve(48.53); 
  //   }
  // }

}