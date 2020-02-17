import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { PartService } from '../part.service';
import { IGroup } from '../igroup';
import { IPart } from '../ipart';
import { SubgroupComponent } from './subgroup.component'
import { ISubgroup } from '../isubgroup';

@Component({
  selector: 'app-group-subgroup-mapper',
  templateUrl: './group-subgroup-mapper.component.html',
  styleUrls: ['./group-subgroup-mapper.component.css']
})
export class GroupSubgroupMapperComponent implements OnInit {

  groups: IGroup[];
  selectedGroup: IGroup;
  selectedGroupId: number;
  subGroups: ISubgroup[];
  selectedSubgroup: ISubgroup;
  parts: IPart[];
  unmappedParts: IPart[];
  subgroupParts: IPart[];
  selectedUnmappedParts: IPart[];
  selectedSubgroupParts: IPart[];
  
  constructor(private _partService: PartService, private _modalService: NgbModal, private spinner: NgxSpinnerService) { }

  newSubgroup() {
    const modalRef = this._modalService.open(SubgroupComponent, {size: 'sm'});
    modalRef.componentInstance.groupId = this.selectedGroupId;
    modalRef.result.then((r => {
      this.subGroups.splice(0,0,r);
      this.changeSubgroup(r);
    }))
  }

  addPartSubgroups() {

    this.unmappedParts.filter((p: IPart) => p.selected).forEach( p => {
      p.subgroupId = this.selectedSubgroup.id;
      p.selected = false;
      this._partService.addPartSubgroup(this.selectedSubgroup, p.partNumber);
    })

    this.resetPartLists();
  }

  removePartSubgroups() {

    this.subgroupParts.filter((p: IPart) => p.selected).forEach( p => {
      p.subgroupId = null;
      p.selected = false;
      this._partService.removePartSubgroup(this.selectedSubgroup, p.partNumber);
    })

    this.resetPartLists();
  }

  resetPartLists() {
    this.unmappedParts = this.parts.filter((p: IPart) => p.subgroupId <= 0);

    if(this.selectedSubgroup != null){
      this.subgroupParts = this.parts.filter((p: IPart) => p.subgroupId == this.selectedSubgroup.id);
    } else {
      this.subgroupParts = null;
    }
  }


  changeGroup(groupId: number) {
    this.spinner.show();
    this.selectedGroupId = groupId;
    this.selectedGroup = this.groups.find((g: IGroup) => g.id == groupId );

    this._partService.getPartsByGroup(groupId)
      .subscribe(p => {
        this.parts = p;
        this.resetPartLists()

        this._partService.getSubgroups(groupId).subscribe(s => {
          this.subGroups = s;
          this.spinner.hide();
        });
      })
  }

  changeSubgroup(subgroup: ISubgroup){
    this.subGroups.forEach(s => s.selected = false);
    subgroup.selected = true;
    this.selectedSubgroup = subgroup;

    this.subgroupParts = this.parts.filter((p: IPart) => p.subgroupId == subgroup.id);
  }

  toggleSelectedSubgroup(part: IPart) {
    part.selected = !part.selected;
  }

  toggleSelectedUnmapped(part: IPart) {
    part.selected = !part.selected;
  }

  groupIconUrl(): string {
    if(name != null) {
      return "assets/group-icons/" + this.selectedGroup.name.toLocaleLowerCase() + ".png";
    }
    else {
      return "assets/group-icons/blank.png";
    }
  }


  ngOnInit() {
    this.spinner.show();    

    this._partService.getGroups()
      .subscribe(g => {
        this.groups = g;
        this.spinner.hide();    
      })
  }
}
