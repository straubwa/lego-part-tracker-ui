import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

import { ISet } from '../sets/iset';


@Injectable({
    providedIn: 'root',
  })
export class RebrickableService {
    private _baseServiceUrl = environment.serviceApiUrl;

    constructor(private _http: HttpClient) {}
    

    importSet(setNumber: string): Observable<ISet> {
        var url = this._baseServiceUrl + "/rebrickable/sets/ImportSet/" + setNumber;
        console.log(url);
        return this._http.post<ISet>(url,"").pipe(
           catchError(this.handleError))
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}