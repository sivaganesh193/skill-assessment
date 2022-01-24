import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {ProcessHttpService} from './process-http.service';

const baseUrl = 'http://localhost:8831/';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpService) { }
    postLogs(logs: any): Observable<any>{
      return this.http.post<any>(baseUrl+'store_logs',logs).pipe(catchError(this.processHTTPMsgService.handleError));
    }
    postResults(results: any): Observable<any>{
      return this.http.post<any>(baseUrl+'store_result',results).pipe(catchError(this.processHTTPMsgService.handleError));
    }

}
