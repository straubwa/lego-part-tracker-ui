import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ISet } from './set';
import { ISetPart } from './isetpart';

@Injectable()
export class SetService {
    private _baseServiceUrl = environment.setServiceApiUrl;

    constructor(private _http: HttpClient) {}

    getSets(): Observable<ISet[]> {
        var getUrl = this._baseServiceUrl + "/sets";
        return this._http.get<ISet[]>(getUrl)
            .catch(this.handleError);
    }

    getSet(setNumber: string): Observable<ISet>{
        var getUrl = this._baseServiceUrl + "/sets/" + setNumber;
        return this._http.get<ISet>(getUrl)
            .catch(this.handleError);
    }

    getSetParts(setNumber: string): Observable<ISetPart[]> {
        var getUrl = this._baseServiceUrl + "/sets/" + setNumber + "/parts";
        return this._http.get<ISetPart[]>(getUrl)
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}