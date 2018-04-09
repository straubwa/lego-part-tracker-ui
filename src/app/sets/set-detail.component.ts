import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { ISet } from './set';

@Component({
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.css']
})
export class SetDetailComponent implements OnInit {
  pageTitle: string = 'Details for set ';
  set: ISet;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    let setNumber = this._route.snapshot.paramMap.get('setNumber');
    this.pageTitle += setNumber;
  }

}
