import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";

interface FetchDataConfig{
  url: string
  method: string
  body?: any
  headers?: HttpHeaders
  params?: HttpParams
}

export class FetchDataService {

  apiRoot = environment.API_ROOT

  constructor(
    protected http: HttpClient
  ) {
  }

  public fetch<T>(config:FetchDataConfig):Observable<T>{
    return this.http.request<T>(config.method, `${this.apiRoot}${config.url}`, {
      body: config.body,
      headers: config.headers,
      params: config.params
    }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
