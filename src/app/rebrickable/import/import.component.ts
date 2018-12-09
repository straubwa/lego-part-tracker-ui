import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private _setService: SetService, private _rebrickableService: RebrickableService, private spinner: NgxSpinnerService) { }

  importSet() {
    this.responseMessage = 'import started';
    this.spinner.show();
 
    this._rebrickableService.importSet(this.setNumber)
      .subscribe(set => {
        this.responseMessage = "import finished";
        this.setNumber = set.setNumber;
        this.importedSet = set;
        this.spinner.hide();
      },
      error => {
        this.responseMessage = <any>error;
        this.spinner.hide()
      }); 
  }

  importSetTest() {
    this.spinner.show();
    this.responseMessage = 'test import started';
    this.delay(1000).then(any => {
      this.responseMessage = "import finished";
      this._setService.getSet(this.setNumber)
        .subscribe(set => {
          this.importedSet = set;
        })
      this.spinner.hide();
    });  
  }
  
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  ngOnInit() {
  }

}
