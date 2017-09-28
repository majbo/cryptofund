import { Component, OnInit } from '@angular/core';
import { ICoinPosition } from '../icoin-position';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  private DataService: DataService;
  CoinPositions: ICoinPosition[];

  constructor(dataService: DataService) { 
    this.DataService = dataService;
  }

  ngOnInit() {
    this.DataService.GetCoinPositions().then(positions => {
      this.CoinPositions = positions;
    } );
  }

}


