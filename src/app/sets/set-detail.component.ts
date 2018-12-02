import { Component, OnInit, SimpleChange } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ISet } from './iset';
import { ISetPart } from './isetpart';
import { SetService } from './set.service';
import { LightboxComponent } from '../shared/lightbox/lightbox.component';

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
  sortedBy: string = '';


  constructor(private _route: ActivatedRoute, private _setService: SetService, private _modalService: NgbModal) { }

  get partsRemaining(): number {
    return this.setParts.map(p => p.quantityNeeded).reduce((prev, next) => prev + next) - this.setParts.map(p => p.quantityFound).reduce((prev, next) => prev + next);
  }

  get partsTotal(): number {
    return this.setParts.map(p => p.quantityNeeded).reduce((prev, next) => prev + next);
  }

  get partsDistinctTotal(): number {
    return this.setParts.length;
  }

  get partsDistinctRemaining(): number {
    return this.setParts.filter((part: ISetPart) => (part.quantityNeeded - part.quantityFound) > 0).length;
  }

  openModalImage(setPart: ISetPart) {
    const modalRef = this._modalService.open(LightboxComponent);
    modalRef.componentInstance.imageUrl = setPart.partImageUrl;
  }

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
  
  changeSort(sortBy: string) {
    this.sortedBy = sortBy.toLocaleLowerCase();
    this.performSort();
  }

  performSort() {
    if(this.sortedBy ==='name') {
      this.visibleSetParts.sort(sortByNameAsc);
    }
    else if(this.sortedBy === 'color') {
      this.visibleSetParts.sort(sortByColorAsc);
    }
    else if(this.sortedBy === 'partnumber') {
      this.visibleSetParts.sort(sortByPartNumberAsc);
    }
    else if(this.sortedBy === 'need') {
      this.visibleSetParts.sort(sortByNeedDesc);
    }
  }

  clearAllPartsFound() {
    this._setService.updateSetPartsClearFound(this.set.setNumber);
    //foreach item in array, set found = 0 and remaining = need
    for(let p of this.setParts) {
      p.quantityFound = 0;
      p.quantityRemaining = p.quantityNeeded;
    }
    this.performFilter();
    this.performSort();
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
    this.performSort();

    //toast message that it was updated?
    console.log('changed ' + setPart.id + ' quanityRemaining = ' + setPart.quantityRemaining);
  }


  clearPartFoundCount(setPart: ISetPart) {
    
    //send update to database
    this._setService.updateSetPartFound(this.set.setNumber, setPart.id, 0);

    setPart.quantityFound = 0;
    setPart.quantityRemaining = setPart.quantityNeeded;
    this.performFilter();
    this.performSort();

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