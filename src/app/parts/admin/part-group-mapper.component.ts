import { Component, OnInit } from '@angular/core';

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


  constructor(private _partService: PartService) { }

  fillPartsForCategory(categoryId: number) {

    this._partService.getPartsWithNoGroup(categoryId)
      .subscribe(p => {
        this.parts = p;
      })
  }

  ngOnInit() {

    this._partService.getNoGroupCategories()
      .subscribe(c => {
        this.categories = c;
      })

    this._partService.getGroups()
      .subscribe(g => {
        this.groups = g;
      })
  }
}
