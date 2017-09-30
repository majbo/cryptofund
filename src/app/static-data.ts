import { ICoinPosition} from "./icoin-position"

export class StaticData {
    public GetCoinPositions() : ICoinPosition[]{
        return [ {
            Key: "BTC",
            Title: "Bitcoin",
            Quantity: 0.19790181,
            InitialPrice: 3624.90 * 1.1457,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        } ,{
            Key: "ETH",
            Title: "Ether",
            Quantity: 3.47964705,
            InitialPrice: 255.00 * 1.1457,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        },{
            Key: "XRP",
            Title: "Ripple",
            Quantity: 1149.66,
            InitialPrice: 0.17 * 1.1457,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        },{
            Key: "LTC",
            Title: "Litecoin",
            Quantity: 4.26077214,
            InitialPrice: 46.39 * 1.1457,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        }];
    }

    public GetStartDate() : Date {
        return new Date("September 30, 2017 00:00:00")
    }
}