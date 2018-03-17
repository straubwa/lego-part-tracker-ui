import {Component} from '@angular/core';
import { ISet } from './set';
import { SetService } from './set.service';

@Component({
    selector: 'app-sets',
    templateUrl: './set-list.component.html'
})
export class SetListComponent {
    pageTitle: string = 'List of Lego Sets';
    imageWidth: number = 200;
    imageMargin: number = 2;

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

    constructor(private _setService: SetService) {
    }

    performFilter(filterBy: string): ISet[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.sets.filter((set: ISet) => set.name.toLocaleLowerCase().indexOf(filterBy) !== -1 || set.theme.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit(): void {
        this.sets = this._setService.getSets();
        this.filteredSets = this.sets;
        this.listFilter = 'Ninjago';
    }

}