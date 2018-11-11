import { Component, OnInit, SimpleChange } from '@angular/core';
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
  visibleSetParts: ISetPart[];
  filteredBy: string = 'find';


  constructor(private _route: ActivatedRoute, private _setService: SetService) { }


  performFilter() {
    if(this.filteredBy==='all'){
      this.visibleSetParts = this.setParts;
    }
    else if(this.filteredBy==='find') {
      this.visibleSetParts = this.setParts.filter((part: ISetPart) => (part.quantityNeeded - part.quantityFound) > 0);
    }
    else if(this.filteredBy==='found'){
      this.visibleSetParts = this.setParts.filter((part: ISetPart) => (part.quantityNeeded - part.quantityFound) == 0);
    }
  }
  
  performSort(sortBy: string) {
    sortBy = sortBy.toLocaleLowerCase();
    if(sortBy ==='name') {
      this.visibleSetParts.sort(sortByNameAsc);
    }
    else if(sortBy === 'color') {
      this.visibleSetParts.sort(sortByColorAsc);
    }
    else if(sortBy === 'partnumber') {
      this.visibleSetParts.sort(sortByPartNumberAsc);
    }
    else if(sortBy === 'need') {
      this.visibleSetParts.sort(sortByNeedDesc);
    }
  }


  updatePartFoundCount(setPart: ISetPart) {

    if(setPart.quantityNeeded < (setPart.quantityFound + setPart.quantityRemaining)) {
      alert('you can only find as many as you need, not more');
      return;
    }
    
    //send update to database
    this._setService.updateSetPartFound(this.set.setNumber, setPart.id, setPart.quantityRemaining);

    setPart.quantityFound = setPart.quantityFound + setPart.quantityRemaining;
    setPart.quantityRemaining = setPart.quantityNeeded - setPart.quantityFound;
    this.performFilter();

    //toast message that it was updated?
    console.log('changed ' + setPart.id + ' quanityRemaining = ' + setPart.quantityRemaining);
  }


  clearPartFoundCount(setPart: ISetPart) {
    
    //send update to database
    this._setService.updateSetPartFound(this.set.setNumber, setPart.id, 0);

    setPart.quantityFound = 0;
    setPart.quantityRemaining = setPart.quantityNeeded;
    this.performFilter();

    //toast message that it was updated?
    console.log('cleared parts found for ' + setPart.id + ' quanityRemaining = ' + setPart.quantityRemaining);
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
        this.performFilter();
      },
      error => this.errorMessage = <any>error);
  }

}

function sortByColorAsc(s1: ISetPart, s2: ISetPart) {
  if(s1.color > s2.color) return 1;
  else if(s1.color === s2.color) return 0;
  else return -1;
}

function sortByNameAsc(s1: ISetPart, s2: ISetPart) {
  if(s1.name > s2.name) return 1;
  else if(s1.name === s2.name) return 0;
  else return -1;
}

function sortByNeedDesc(s1: ISetPart, s2: ISetPart) {
  if(s1.quantityNeeded < s2.quantityNeeded) return 1;
  else if(s1.quantityNeeded === s2.quantityNeeded) return 0;
  else return -1;
}

function sortByPartNumberAsc(s1: ISetPart, s2: ISetPart) {
  if(s1.partNumber > s2.partNumber) return 1;
  else if(s1.partNumber === s2.partNumber) return 0;
  else return -1;
}