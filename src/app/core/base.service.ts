import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getViaParam(relativeUrl: any, queryParams): Observable<any> {
    let params = new HttpParams();
    if (queryParams) {
      for (let param in queryParams) {
        params = params.set(param, queryParams[param]);
      }
    }
    // Set any specific headers
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }),
      params: params
    };
    const url = (relativeUrl) ? this.baseUrl + relativeUrl : this.baseUrl;
    return this.http.get(url, httpOptions);
  }

  public postViaObjectParam(relativeUrl: string, querystring): Observable<any> {
    let params = JSON.stringify(querystring);

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    return this.http.post(this.baseUrl + relativeUrl, params, options);
  }

  public postViaHttpParam(relativeUrl: string, querystring): Observable<any> {
    let formData = new FormData();
    for (let param in querystring) {
      formData.append(param,querystring[param]);
    }
    return this.http.post(this.baseUrl + relativeUrl, formData);
  }


  getJsonFile(path): Observable<any> {
    return this.http.get(path);
  }

}
