import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ISet } from './iset';
import { SetService } from './set.service';
import { LightboxComponent } from '../shared/lightbox/lightbox.component';

@Component({
    templateUrl: './set-list.component.html'
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

    constructor(private _setService: SetService, private _modalService: NgbModal) {
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
        this._setService.getSets()
            .subscribe(sets => {
                this.sets = sets;
                this.filteredSets = this.sets;
                this.listFilter = '';
            }, 
                error => this.errorMessage = <any>error);
    }

}