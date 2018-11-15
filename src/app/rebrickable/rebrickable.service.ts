import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
  })
export class RebrickableService {
    private _baseServiceUrl = environment.setServiceApiUrl;

    constructor(private _http: HttpClient) {}
    

    importSet(setNumber: string) {
        var url = this._baseServiceUrl + "/rebrickable/sets/ImportSet/" + setNumber;
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