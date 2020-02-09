import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { PartService } from '../part.service';
import { IGroup } from '../igroup';
import { IPart } from '../ipart';
import { SubgroupComponent } from './subgroup.component'

@Component({
  selector: 'app-group-subgroup-mapper',
  templateUrl: './group-subgroup-mapper.component.html',
  styleUrls: ['./group-subgroup-mapper.component.css']
})
export class GroupSubgroupMapperComponent implements OnInit {

  groups: IGroup[];
  selectedGroup: IGroup;
  parts: IPart[];
  unmappedParts: IPart[];
  selectedunmappedParts: IPart[];
  
  constructor(private _partService: PartService, private _modalService: NgbModal, private spinner: NgxSpinnerService) { }

  newSubgroup() {
    const modalRef = this._modalService.open(SubgroupComponent, {size: 'sm'});

  }

  changeGroup(groupId: number) {

    this.spinner.hide();
  }
  
  fillPartsForGroup(groupId: number) {
    
    this.spinner.show();

    this._partService.getPartsByGroup(groupId)
      .subscribe(p => {
        this.parts = p;
        this.unmappedParts = this.parts.filter((p: IPart) => p.subgroupId <= 0);
        this.spinner.hide();
      })
  }

  toggleSelectedUnmapped(part: IPart) {
    part.selected = !part.selected;

    this.selectedunmappedParts = this.parts.filter((p: IPart) => p.selected && p.subgroupId <= 0);
  }

  ngOnInit() {
    this.spinner.show();    

    this.fillPartsForGroup(-1);

    this._partService.getGroups()
      .subscribe(g => {
        this.groups = g;
      })
  }

}
