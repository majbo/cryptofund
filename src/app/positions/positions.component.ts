import { Component, OnInit } from '@angular/core';
import { ICoinPosition } from '../icoin-position';
import { DataService } from '../data-service.service';
import { ICoinPositionData } from '../icoin-position-data';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})

export class PositionsComponent implements OnInit {
  public initialized = false;
  private DataService: DataService;
  CoinPositionsData: ICoinPositionData;

  constructor(dataService: DataService) { 
    this.DataService = dataService;
  }

  ngOnInit() {
    this.DataService.GetCoinPositionData().then(data => {
      this.CoinPositionsData = data;
      this.initialized = true;
    } );
  }
}