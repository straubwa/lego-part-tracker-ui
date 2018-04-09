import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { ISet } from './set';
import { SetService } from './set.service';

@Component({
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.css']
})
export class SetDetailComponent implements OnInit {
  pageTitle: string = 'Details for set ';
  errorMessage: string;
  imageWidth: number = 600; 
  set: ISet;

  constructor(private _route: ActivatedRoute, private _setService: SetService) { }

  ngOnInit() {
    let setNumber = this._route.snapshot.paramMap.get('setNumber');
    this.pageTitle += setNumber;

    this._setService.getSet(setNumber)
      .subscribe(set => {
        this.set = set;
      },
        error => this.errorMessage = <any>error);
  }

}
