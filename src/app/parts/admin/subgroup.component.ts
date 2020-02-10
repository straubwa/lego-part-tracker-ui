import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PartService } from '../part.service';
import { ImageService } from '../../shared/image.service';
import { ISubgroup } from '../isubgroup';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css'],
  providers: [PartService, ImageService]
})
export class SubgroupComponent implements OnInit {

  @Input() groupId:number;

  selectedFile: File = null;
  imageUrl: any;

  constructor(public activeModal: NgbActiveModal, private _imageService: ImageService, private _partService: PartService, private http: HttpClient) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    //show file selected to be uploaded
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  onUpload() {
    console.log('onUpload start');
    
    this._imageService.newImageUpload(this.selectedFile)
    .subscribe(r => {
      console.log(`image url: ${r}`);

      var subgroup: ISubgroup = {
        groupId : this.groupId, 
        name : this.selectedFile.name,
        iconFileName : this.selectedFile.name,
        iconUrl : r
      }

      this._partService.newSubgroup(subgroup)
      .subscribe(r => {
        console.log(r);
        
        this.activeModal.close(r);
      })
    });
  }

  ngOnInit() {
  }

}
