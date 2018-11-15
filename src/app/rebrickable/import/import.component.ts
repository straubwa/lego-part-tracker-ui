import { Component, OnInit } from '@angular/core';

import { RebrickableService } from '../rebrickable.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  setNumber: string;
  responseMessage: string;

  constructor(private _rebrickableService: RebrickableService) { }

  importSet() {
 
    this._rebrickableService.importSet(this.setNumber);
    this.responseMessage = "imported";

  }

  ngOnInit() {
  }

}
