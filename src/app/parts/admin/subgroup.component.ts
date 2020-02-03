import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css']
})
export class SubgroupComponent implements OnInit {

  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    console.log('onUpload start');
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://api.imgbb.com/1/upload?key=ddc08e4f2aa4ccc9ccc50577a11be99c', fd)
    .subscribe(res => {
      console.log(res);
    });
    console.log('onUpload complete');
  }

  ngOnInit() {
  }

}
