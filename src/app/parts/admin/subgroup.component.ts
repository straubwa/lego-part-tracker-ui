import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent implements OnInit {

  selectedFile: File = null;

  constructor(private _imageService: ImageService, private http: HttpClient) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    console.log('onUpload start');
    this._imageService.newImageUpload(this.selectedFile)
    .subscribe(res => {
      console.log(`from component: ${res}`);
    });
    console.log('onUpload complete');
  }

  ngOnInit() {
  }

}
