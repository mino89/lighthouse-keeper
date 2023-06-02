import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FeedbackService } from "./feedback.service";

interface FetchDataConfig {
  url: string
  method: string
  body?: any
  headers?: HttpHeaders
  params?: HttpParams
}

interface HttpParamsConfig{
  [key: string]: string
}

export class FetchDataService {

  apiRoot = environment.API_ROOT
  // this variable is defined to provide access control the mock api
  // must be set to
  secureUrlCode = !environment.production
                  && environment.SECURE_URL_CODE.length
                  && `/${environment.SECURE_URL_CODE}` || ''
  constructor(
    protected http: HttpClient,
    protected feedback: FeedbackService,
  ) {
  }

  public fetch<T>(config: FetchDataConfig): Observable<T> {
    return this.http.request<T>(config.method, `${this.apiRoot}${config.url}`, {
      body: config.body,
      headers: config.headers,
      params: config.params
    }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  public buildParams(params: HttpParamsConfig): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key: string) => {
      httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
  }

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
}
