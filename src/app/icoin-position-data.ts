import { ICoinPosition } from "./icoin-position";

export interface ICoinPositionData {
    CoinPositions: ICoinPosition[];
    TotalProfitAmount: number;
    TotalProfitPercentage: number;
}
