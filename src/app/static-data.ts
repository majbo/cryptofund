import { ICoinPosition} from "./icoin-position"

export class StaticData {
    public GetCoinPositions() : ICoinPosition[]{
        return [ {
            Key: "BTC",
            Title: "Bitcoin",
            Quantity: 0.2,
            InitialPrice: 3800,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        } ,{
            Key: "ETH",
            Title: "Ether",
            Quantity: 2,
            InitialPrice: 311,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        },{
            Key: "XRP",
            Title: "ripple",
            Quantity: 1000,
            InitialPrice: 0.51,
            CurrentPrice: 0,
            Profit: 0,
            ProfitAmount: 0,
            ProfitPercentage: 0
        }];
    }
}

// Key: string,
// Title: string,
// Quantity: number,
// InitialPrice: number,
// CurrentPrice: number,
// Profit: number,
// ProfitAmount: number,
// ProfitPercentage: number