import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { StaticData } from './static-data';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { ICoinPosition } from './icoin-position';
import { ICoinPositionData } from './icoin-position-data';
import { IChartData } from './ichart-data';
import { IChartDataPoint } from './ichart-data-point';

@Injectable()
export class DataService {
  
  constructor(private http: Http, private StaticData: StaticData) { }

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
   
    return Promise.all(promises).then(chartDatas => {
      for (let chartData of chartDatas) {
        
      }

      return chartDatas;
    });
  }

  public GetCoinPositionData() : Promise<ICoinPositionData>{
    return this.getExchangeRate().then(exchangeRate => {
      let promises = [];
      let positions = this.StaticData.GetCoinPositions();

      for (let position of positions) {
        promises.push(this.getCurrentValue(position.Key).then(price => {
          position.CurrentPrice = price * exchangeRate;
          position.Profit = price - position.InitialPrice;
          position.ProfitAmount = position.Profit * position.Quantity;
          position.ProfitPercentage = 100 * position.Profit / position.InitialPrice;
          return position;
        }));
      }

      return Promise.all(promises).then(coinPositions => {
        let data = {
          CoinPositions: coinPositions,
          TotalProfitAmount: 0,
          TotalProfitPercentage: 0
        };
        let totalBuyAmount = 0;
        for (let position of coinPositions as ICoinPosition[]) {
          totalBuyAmount += position.Quantity * position.InitialPrice;
          data.TotalProfitAmount += position.ProfitAmount;
        }
        data.TotalProfitPercentage = (data.TotalProfitAmount / totalBuyAmount) * 100;
        return data
      });
    });
  }

  private getCurrentValue(currency: string) : Promise<number>{
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().USD as number)
      .catch(this.handleError);
  }

  private getExchangeRate(date?: Date) {
    let url: string;
    if (date){
      let dateString = moment(date).format("YYYY-MM-DD");
      url = `http://api.fixer.io/${dateString}?symbols=CHF`;
    } else {
      url = "http://api.fixer.io/latest?base=USD&symbols=CHF";
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().rates.CHF as number)
      .catch(this.handleError);
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
    return this.getHistoricalValue(currency, date).then(value => {
      return {
        t: date,
        y: value * quantity
      };
    });
  }

  private getHistoricalValue(currency: string, date: Date){
    const timeStamp = moment(date).format("X");
    const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${timeStamp}`;
    
    return this.http.get(url)
    .toPromise()
    .then(response => {
      return response.json()[currency].USD as number;
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
