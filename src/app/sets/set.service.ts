import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ISet } from './set';

@Injectable()
export class SetService {
    private _allSetsUrl = 'http://localhost:63234/api/sets';

    constructor(private _http: HttpClient) {}

    getSets(): Observable<ISet[]> {
        return this._http.get<ISet[]>(this._allSetsUrl)
            .do(data => console.log('all: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}