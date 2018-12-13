import { Component, OnInit } from '@angular/core';

import { PartService } from '../part.service';
import { ICategory } from '../icategory';

@Component({
  selector: 'app-part-group-mapper',
  templateUrl: './part-group-mapper.component.html',
  styleUrls: ['./part-group-mapper.component.css']
})
export class PartGroupMapperComponent implements OnInit {

  categories: ICategory[];

  constructor(private _partService: PartService) { }

  ngOnInit() {

    this._partService.getNoGroupCategories()
    .subscribe(c => {
      this.categories = c;
    })
  }

}
