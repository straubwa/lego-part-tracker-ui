import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ISet } from './iset';
import { SetService } from './set.service';
import { LightboxComponent } from '../shared/lightbox/lightbox.component';

@Component({
    templateUrl: './set-list.component.html',
    styleUrls: ['./set-list.component.css']
})
export class SetListComponent {
    pageTitle: string = 'List of Lego Sets';
    imageWidth: number = 200;
    imageMargin: number = 2;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredSets = this.listFilter ? this.performFilter(this.listFilter) : this.sets;
    }

    filteredSets: ISet[];
    sets: ISet[];

    constructor(private _setService: SetService, private _modalService: NgbModal, private _router: Router, private spinner: NgxSpinnerService) {
    }

    goToSet(setNumber: string) {
        this._router.navigate(['/sets', setNumber]);
    }

    openModalImage(set: ISet) {
        const modalRef = this._modalService.open(LightboxComponent, {size: 'lg'});
        modalRef.componentInstance.title = set.name;
        modalRef.componentInstance.imageUrl = set.setImageUrl;
    }

    performFilter(filterBy: string): ISet[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.sets.filter((set: ISet) => set.name.toLocaleLowerCase().indexOf(filterBy) !== -1 
        || set.theme.toLocaleLowerCase().indexOf(filterBy) !== -1
        || set.setNumber.toLocaleLowerCase().indexOf(filterBy) !== -1 );
    }

    ngOnInit(): void {
        this.spinner.show();
        this._setService.getSets()
            .subscribe(sets => {
                this.sets = sets;
                this.filteredSets = this.sets;
                this.listFilter = '';
                this.spinner.hide();
            }, 
                error => this.errorMessage = <any>error);
    }

}