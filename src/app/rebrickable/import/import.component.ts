import { Component, OnInit } from '@angular/core';

import { ISet } from '../../sets/iset';
import { SetService } from '../../sets/set.service';
import { RebrickableService } from '../rebrickable.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  setNumber: string;
  responseMessage: string = '';
  importedSet: ISet;
  imageWidth: number = 200;

  constructor(private _setService: SetService, private _rebrickableService: RebrickableService) { }

  importSet() {
    this.responseMessage = 'import started';
 
    this._rebrickableService.importSet(this.setNumber)
      .subscribe(_ => {
        this.responseMessage = "import finished";
        this._setService.getSet(this.setNumber)
        .subscribe(set => {
          this.importedSet = set;
        });
      },
      error => this.responseMessage = <any>error); 
  }

  ngOnInit() {
  }

}
