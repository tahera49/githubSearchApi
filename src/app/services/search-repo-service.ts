import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SearchRepoService {
    public searchUrl = environment.searchRepoUrl;
    public corsUrl = environment.CORSPROXY_HOST;
    constructor(public http: HttpClient) { }

    public getRepo(searchParam: any) {
        console.log('Entering the method to get the storageMetrics.....');
        const searchUrl = this.corsUrl + "/" + this.searchUrl + searchParam;
        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            });
        console.log('Entering the method to get the storageMetrics.....' + searchUrl);
        return this.http.get(searchUrl, { headers: headers });
    }
}