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
  selectedunmappedParts: IPart[];
  
  constructor(private _partService: PartService, private _modalService: NgbModal, private spinner: NgxSpinnerService) { }

  newSubgroup() {
    const modalRef = this._modalService.open(SubgroupComponent, {size: 'sm'});
    modalRef.componentInstance.groupId = this.selectedGroupId;
    modalRef.result.then((r => {
      console.log('returned from modal...');
      console.log(r);
    }))
  }

  newPartSubgroups() {

  }

  removePartSubgroups() {

  }


  changeGroup(groupId: number) {
    this.spinner.show();
    this.selectedGroupId = groupId;
    this.selectedGroup = this.groups.find((g: IGroup) => g.id == groupId );
    
    //this.selectedGroupId = groupId;

    this._partService.getPartsByGroup(groupId)
      .subscribe(p => {
        this.parts = p;
        this.unmappedParts = this.parts.filter((p: IPart) => p.subgroupId <= 0);

        //get subgroups
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

    //load parts mapped to this subgroup
  }

  toggleSelectedMapped(part: IPart) {

  }

  toggleSelectedUnmapped(part: IPart) {
    part.selected = !part.selected;

    this.selectedunmappedParts = this.parts.filter((p: IPart) => p.selected && p.subgroupId <= 0);
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

//    this.changeGroup(-1);

    this._partService.getGroups()
      .subscribe(g => {
        this.groups = g;        
//        this.changeGroup(-1);
        this.spinner.hide();    
      })
  }
}
