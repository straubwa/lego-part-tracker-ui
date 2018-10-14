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
