import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import {BehaviorSubject, Observable, catchError, throwError, pipe, shareReplay} from "rxjs";
import { environment } from "src/environments/environment";
import { FeedbackService } from "./feedback.service";
import { buildUrlParams } from "../utils/http-client.util";
import { LoadingService } from "./loading.service";
import { switchLoading } from "../utils/loading.util";
import { Injectable } from "@angular/core";

export interface FetchDataConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: HttpHeaders
  params?: HttpParams
}
@Injectable()
export class FetchDataService {

  apiRoot = environment.API_ROOT
  // this variable is defined to provide access control the mock api
  // must be set to
  secureUrlCode = !environment.production
                  && environment.SECURE_URL_CODE.length
                  && `/${environment.SECURE_URL_CODE}` || ''

  buildParams = buildUrlParams
  private localLoadingSubject = new BehaviorSubject<boolean>(false)
  localLoading$ = this.localLoadingSubject.asObservable()
  constructor(
    protected http: HttpClient,
    protected feedback: FeedbackService,
    protected loading: LoadingService,
  ) {
  }

  /**
   * make http request through HttpClient
   * @param {FetchDataConfig} config
   * @returns {Observable<T>}
   * @memberof FetchDataService
   */
  public fetch<T>(config: FetchDataConfig): Observable<T> {
    return this.http.request<T>(config.method, `${this.apiRoot}${config.url}`, {
      body: config.body,
      headers: config.headers,
      params: config.params
    }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * handle any error from http request
   * @param {HttpErrorResponse} error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status},` +
        `body was: ${error.error}`);
    }

    return throwError(() =>{
      if(typeof error.error === 'string'){
        this.feedback.getFeedback(error.error)
      }else{
        this.feedback.getFeedback(error.status.toString())
      }
      return error
     });
  }

  /**
   * create a loading obsevable related to service
   * @param {Observable<T>} obs$
   * @returns {Observable<T>}
   * @memberof FetchDataService
   */
  protected handleLocalLoading<T>(obs$: Observable<T>): Observable<T> {
    const globalLoading$ = this.loading.loadingUntilComplete(obs$)
    return switchLoading(globalLoading$, {
      start: () => this.localLoadingSubject.next(true),
      end: () => this.localLoadingSubject.next(false),
    })
  }
}
