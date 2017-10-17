import { Injectable } from "@angular/core";
import { StaticData } from "./static-data";
import { DataService } from "./data-service.service";
import { ICoinPosition } from "./icoin-position";
import { ICoinPositionData } from "./icoin-position-data";

@Injectable()
export class PositionService {
  
  constructor(private StaticData: StaticData, private DataService: DataService) { }

  public GetCoinPositionData() : Promise<ICoinPositionData>{
    //todo: replace by call to data service
    return this.DataService.getExchangeRate().then(exchangeRate => {
      let promises = [];
      let positions = this.StaticData.GetCoinPositions();

      for (let position of positions) {
        //todo: replace by call to data service
        promises.push(this.DataService.getCurrentValue(position.Key).then(price => {
          position.CurrentPrice = price * exchangeRate;
          position.Profit = position.CurrentPrice - position.InitialPrice;
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


}