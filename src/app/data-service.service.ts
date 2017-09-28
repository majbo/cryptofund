import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { StaticData } from './static-data';

import 'rxjs/add/operator/toPromise';
import { ICoinPosition } from './icoin-position';
import { ICoinPositionData } from './icoin-position-data';

@Injectable()
export class DataService {

  constructor(private http: Http, private StaticData: StaticData) { }

  // public GetCoinPositionData() : Promise<ICoinPositionData> {
    
  //   this.GetCoinPositions().then(positions => {
  //     //let total = 

  //   });


  // }

  public GetCoinPositions() : Promise<ICoinPosition[]>{
    let positions = this.StaticData.GetCoinPositions();

    let promises = [];

    for (let position of positions) {
      promises.push(this.getCurrentValue(position.Key).then(value => {
        //position.CurrentPrice = value;
        this.UpdatePosition(position, value);
        return position;
      }));
    }

    return Promise.all(promises);
  }

  private UpdatePosition(position: ICoinPosition, price: number){
    position.CurrentPrice = price;
    position.Profit = price - position.InitialPrice;
    position.ProfitAmount = position.Profit * position.Quantity;
    position.ProfitPercentage = 100 * position.Profit / position.InitialPrice;
  }

  private getCurrentValue(currency: string) : Promise<number>{
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=CHF`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().CHF as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
