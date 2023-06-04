import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParamsConfig, buildUrlParams } from '../utils/http-client.util';
import { BehaviorSubject, Observable, catchError, concatMap, finalize, map, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { switchLoading } from '../utils/loading.util';
import { LightHouseAudit } from '../models/lighthouse';
@Injectable({
  providedIn: 'root'
})

export class LighthouseService {

  loadingSubject = new BehaviorSubject<boolean>(false)
  loading$ = this.loadingSubject.asObservable()

  lightHouseApiUrl = environment.PAGESPEED_API_ROOT
  lightHouseApiKey = environment.PAGESPEED_API_KEY
  constructor(
    private http: HttpClient,
    private feedback: FeedbackService,
  ) {

  }
  /**
   * it will make a request to google page speed api
   * @param {HttpParamsConfig} params
   * @returns {Observable<LightHouseAudit>}
   */
  public audit(params: HttpParamsConfig): Observable<LightHouseAudit> {
    const httpParams = buildUrlParams(params)
    const url = `${this.lightHouseApiUrl}?key=${this.lightHouseApiKey}`
    const obs$ = this.http.get<any>(
      url,
      {
        params: httpParams,
      }).pipe(
        map((response) => {
          return this.transformResponse(response)
        }),
        catchError((error) => {
          this.feedback.getFeedback(error.error.error.message)
          return throwError(() => error)
        }),
      )

    return switchLoading(obs$, {
      start: () => this.loadingSubject.next(true),
      end: () => this.loadingSubject.next(false),
    })
  }
  /**
   * transform the response from google page speed api
   * @param {any} response
   * @returns {LightHouseAudit}
   */
  private transformResponse(response: any): LightHouseAudit {
    return {
      id: response?.id,
      type: response?.lighthouseResult?.configSettings.formFactor,
      cruxMetrics: {
        first_contenful_paint: response.loadingExperience.metrics?.FIRST_CONTENTFUL_PAINT_MS?.category,
        first_input_delay: response.loadingExperience.metrics?.FIRST_INPUT_DELAY_MS?.category,
      },
      lighthouseMetrics: {
        first_contentful_paint: response.lighthouseResult?.audits['first-contentful-paint']?.displayValue,
        speed_index: response.lighthouseResult?.audits['speed-index']?.displayValue,
        time_to_interactive: response.lighthouseResult?.audits['interactive']?.displayValue,
        first_meaningful_paint: response.lighthouseResult?.audits['first-meaningful-paint']?.displayValue,
      },
      screenshot: {
        data: response.lighthouseResult.fullPageScreenshot?.screenshot?.data,
        height: response.lighthouseResult.fullPageScreenshot?.screenshot?.height,
        width: response.lighthouseResult.fullPageScreenshot?.screenshot?.width,
      }
    }
  }


}

