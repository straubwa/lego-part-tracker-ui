
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';



import { ISet } from './iset';
import { ISetPart } from './isetpart';

@Injectable()
export class SetService {
    private _baseServiceUrl = environment.setServiceApiUrl;

    constructor(private _http: HttpClient) {}

    getSets(): Observable<ISet[]> {
        var getUrl = this._baseServiceUrl + "/sets";
        return this._http.get<ISet[]>(getUrl).pipe(
            catchError(this.handleError))
    }

    getSet(setNumber: string): Observable<ISet>{
        var getUrl = this._baseServiceUrl + "/sets/" + setNumber;
        return this._http.get<ISet>(getUrl).pipe(
            catchError(this.handleError))
    }

    getSetParts(setNumber: string): Observable<ISetPart[]> {
        var getUrl = this._baseServiceUrl + "/sets/" + setNumber + "/parts";
        return this._http.get<ISetPart[]>(getUrl).pipe(
            catchError(this.handleError))
    }

    updateSetPartFound(setNumber: string, setPartId: number, quantityFound: number) {
        var patchUrl = this._baseServiceUrl + "/sets/" + setNumber + "/parts/" + setPartId;
        console.log(patchUrl);
        var body = [{
            "op": "replace",
            "path": "/quantityFound",
            "value": quantityFound
        }];

        this._http.patch(patchUrl,body).pipe(
            catchError(this.handleError))
        .subscribe();
    }

    updateSetPartsClearFound(setNumber: string) {
        var url = this._baseServiceUrl + "/sets/" + setNumber + "/parts/clearfound";
        console.log(url);
        this._http.post(url,"").pipe(
            catchError(this.handleError))
        .subscribe();
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}