import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

@Injectable()
export class DataService {
  
  constructor(private http: Http) { }

  public getCurrentValue(currency: string) : Promise<number>{
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=USD`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        let json = response.json();
        return json.USD as number;
      })
      .catch(this.handleError);
  }

  public getExchangeRate(date?: Date) : Promise<number>{
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

  public getHistoricalValue(currency: string, date: Date){
    const timeStamp = moment(date).format("X");
    const url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${timeStamp}`;
    
    return this.http.get(url)
    .toPromise()
    .then(response => {
      let json = response.json();
      return json[currency].USD as number;
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}
