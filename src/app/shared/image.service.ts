import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { catchError, mergeMap, map, tap } from 'rxjs/operators';

@Injectable()
export class ImageService {
    private _baseServiceUrl = environment.serviceApiUrl;

    constructor(private _http: HttpClient) { }

    
    newImageUpload(fileToUpload: File):Observable<string> {

        return this._http.get<any>(this._baseServiceUrl + "/parts/ImageUploadUrl").pipe(
            tap(t => {
                console.log(t)
            }),
            mergeMap(r => {
                const fd = new FormData();
                fd.append('image', fileToUpload, fileToUpload.name);
                
                return this._http.post<any>(r.url, fd)
            }),
            tap(t => {
                console.log(t)
            }),
            map(r => r.data.url),
            tap(t => {
                console.log(t)
            }),
            catchError(this.handleError));   
    }
    
  
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}