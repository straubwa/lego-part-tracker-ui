import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

import { ICategory } from './icategory';

@Injectable()
export class PartService {
  private _baseServiceUrl = environment.serviceApiUrl;

  constructor(private _http: HttpClient) { }

  getNoGroupCategories(): Observable<ICategory[]> {
    var getUrl = this._baseServiceUrl + "/parts/GroupDetail/NoGroupCategories";
    return this._http.get<ICategory[]>(getUrl).pipe(
        catchError(this.handleError))
  }
  
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return observableThrowError(err.message);
  }
}
