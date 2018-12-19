import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

import { ICategory } from './icategory';
import { IGroup } from './igroup';
import { IPart } from './ipart';

@Injectable()
export class PartService {
  private _baseServiceUrl = environment.serviceApiUrl;

  constructor(private _http: HttpClient) { }

  getNoGroupCategories(): Observable<ICategory[]> {
    var getUrl = this._baseServiceUrl + "/parts/PartsWithoutGroup/Categories";
    return this._http.get<ICategory[]>(getUrl).pipe(
        catchError(this.handleError))
  }
  
  getPartsWithNoGroup(categoryId: number): Observable<IPart[]> {
    var getUrl = this._baseServiceUrl + "/parts/PartsWithoutGroup/" + categoryId;
    return this._http.get<IPart[]>(getUrl).pipe(
        catchError(this.handleError))
  }

  getGroups(): Observable<IGroup[]> {
    var getUrl = this._baseServiceUrl + "/parts/Groups";
    return this._http.get<IGroup[]>(getUrl).pipe(
        catchError(this.handleError))
  }
  
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return observableThrowError(err.message);
  }
}
