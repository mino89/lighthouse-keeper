import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { FetchDataService } from './fetch-data.service';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { Audit } from '../models/audit';

@Injectable({
  providedIn: 'root'
})
export class AutitsService extends FetchDataService {

  constructor(
    http: HttpClient,
    feedback: FeedbackService,
    private loading: LoadingService,
  ) {
    super(http,feedback);
  }

  public getAudits(): Observable<Audit[]> {
    const res$ =  this.fetch<Audit[]>({
      url: `${this.secureUrlCode}/audits`,
      method: 'GET',
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public getAudit(id: number): Observable<Audit> {
    const res$ =  this.fetch<Audit>({
      url: `${this.secureUrlCode}/audits/${id}`,
      method: 'GET',
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public createAudit(audit: Audit): Observable<Audit> {
    const res$ =  this.fetch<Audit>({
      url: `${this.secureUrlCode}/audits`,
      method: 'POST',
      body: audit
    })
    return this.loading.loadingUntilComplete(res$);
  }
}
