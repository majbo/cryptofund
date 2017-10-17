import { Component, OnInit } from '@angular/core';
import { ICoinPosition } from '../icoin-position';
import { ICoinPositionData } from '../icoin-position-data';
import { PositionService } from '../position-service.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})

export class PositionsComponent implements OnInit {
  public initialized = false;
  private PositionService: PositionService;
  CoinPositionsData: ICoinPositionData;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positionService.GetCoinPositionData().then(data => {
      this.CoinPositionsData = data;
      this.initialized = true;
    } );
  }
}