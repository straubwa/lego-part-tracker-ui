import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { PartService } from '../part.service';
import { ICategory } from '../icategory';
import { IGroup } from '../igroup';
import { IPart } from '../ipart';

@Component({
  selector: 'app-part-group-mapper',
  templateUrl: './part-group-mapper.component.html',
  styleUrls: ['./part-group-mapper.component.css']
})
export class PartGroupMapperComponent implements OnInit {

  categories: ICategory[];
  groups: IGroup[];
  parts: IPart[];
  selectedParts: IPart[];


  constructor(private _partService: PartService, private spinner: NgxSpinnerService) { }

  fillPartsForCategory(categoryId: number) {

    this._partService.getPartsWithNoGroup(categoryId)
      .subscribe(p => {
        this.parts = p;
        this.selectedParts = this.parts.filter((p: IPart) => p.selected);
        this.spinner.hide();
      })
  }

  mapSelectedPartsToGroup(groupId: number) {
    this.spinner.show();
    
    var remaining = this.selectedParts.length;

    for(let p of this.selectedParts) {      
      this._partService.newPartGroup(p.partNumber, groupId)
      .subscribe(p => {
        console.log(JSON.stringify(p));
        remaining = remaining-1;
        if(remaining == 0) {
          this.fillCategoryAndGrid();
        }
      })
    }    
  }

  toggleSelected(part: IPart) {
    part.selected = !part.selected;

    this.selectedParts = this.parts.filter((p: IPart) => p.selected);
  }

  fillCategoryAndGrid() {
    this._partService.getNoGroupCategories()
      .subscribe(c => {
        this.categories = c;
      })

    this.fillPartsForCategory(-1);
  }

  ngOnInit() {
    this.spinner.show();
    this.fillCategoryAndGrid();

    this._partService.getGroups()
      .subscribe(g => {
        this.groups = g;
      })
  }
}
