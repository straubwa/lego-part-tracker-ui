import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {

  @Input() title;
  @Input() imageUrl;

  constructor(public activeModal: NgbActiveModal) { 

  }

  ngOnInit() {
  }

}
