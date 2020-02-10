import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

import { ICategory } from './icategory';
import { IGroup } from './igroup';
import { IPart } from './ipart';
import { IPartGroup } from './ipartgroup';
import { ISubgroup } from './isubgroup';

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
  
  getPartsByGroup(groupId: number): Observable<IPart[]> {
    var getUrl = this._baseServiceUrl + "/parts/Groups/" + groupId +"/Parts/";
    return this._http.get<IPart[]>(getUrl).pipe(
        catchError(this.handleError))
  }

  getGroups(): Observable<IGroup[]> {
    var getUrl = this._baseServiceUrl + "/parts/Groups";
    return this._http.get<IGroup[]>(getUrl).pipe(
        catchError(this.handleError))
  }

  newPartGroup(partNumber: string, groupId: number): Observable<IPartGroup> {
    var postUrl = this._baseServiceUrl + "/parts/PartGroup";
    var partGroup: IPartGroup = {partNumber:partNumber, groupId:groupId}
    return this._http.post<IPartGroup>(postUrl, partGroup).pipe(
      catchError(this.handleError))
  }

  newSubgroup(subGroup: ISubgroup): Observable<IPartGroup> {
    var postUrl = this._baseServiceUrl + `/parts/Groups/${subGroup.groupId}/Subgroups`;
    return this._http.post<IPartGroup>(postUrl, subGroup).pipe(
      catchError(this.handleError))
  }

  getSubgroups(groupId: number): Observable<ISubgroup[]> {
    var getUrl = this._baseServiceUrl + `/parts/Groups/${groupId}/Subgroups`;
    return this._http.get<ISubgroup[]>(getUrl).pipe(
        catchError(this.handleError))
  }
  
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return observableThrowError(err.message);
  }
}
