import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { ISet } from './iset';
import { ISetPart } from './isetpart';
import { SetService } from './set.service';

@Component({
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.css']
})
export class SetDetailComponent implements OnInit {
  pageTitle: string = 'Details for set ';
  errorMessage: string;
  imageWidth: number = 600; 
  setPartWidth: number = 40;
  set: ISet;
  setParts: ISetPart[];

  constructor(private _route: ActivatedRoute, private _setService: SetService) { }

  updatePartFoundCount(setPart: ISetPart) {

    if(setPart.quantityNeeded < (setPart.quantityFound + setPart.quantityRemaining)) {
      alert('you can only find as many as you need, not more');
      return;
    }
    
    //send update to database

    setPart.quantityFound = setPart.quantityFound + setPart.quantityRemaining;
    setPart.quantityRemaining = setPart.quantityNeeded - setPart.quantityFound;

    //toast message that it was updated?
    //alert('changing ' + setPart.id + ' quanityRemaining = ' + setPart.quantityRemaining);
  }

  ngOnInit() {
    let setNumber = this._route.snapshot.paramMap.get('setNumber');
    this.pageTitle += setNumber;

    this._setService.getSet(setNumber)
      .subscribe(set => {
        this.set = set;
      },
      error => this.errorMessage = <any>error);

    this._setService.getSetParts(setNumber)
      .subscribe(setParts => {
        this.setParts = setParts;
      },
      error => this.errorMessage = <any>error);
  }

}
