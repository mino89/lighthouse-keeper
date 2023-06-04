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
export class AuditsService extends FetchDataService {

  constructor(
    http: HttpClient,
    feedback: FeedbackService,
    loading: LoadingService,
  ) {
    super(http,feedback,loading);
  }

  public getAudits(id:number): Observable<Audit[]> {
    const res$ =  this.fetch<Audit[]>({
      url: `${this.secureUrlCode}/audits`,
      method: 'GET',
      params: this.buildParams({
        siteId: id.toString(),
        _sort: 'date',
        _order: 'desc',
      })
    })

    return this.handleLocalLoading(res$);
  }

  public getAudit(id: number): Observable<Audit> {
    const res$ =  this.fetch<Audit>({
      url: `${this.secureUrlCode}/audits/${id}`,
      method: 'GET',
    })
    return this.handleLocalLoading(res$);
  }

  public createAudit(audit: Audit): Observable<Audit> {
    const res$ =  this.fetch<Audit>({
      url: `${this.secureUrlCode}/audits`,
      method: 'POST',
      body: audit
    })
    return this.handleLocalLoading(res$);
  }

  public deleteAudit(id: number): Observable<Audit> {
    const res$ =  this.fetch<Audit>({
      url: `${this.secureUrlCode}/audits/${id}`,
      method: 'DELETE',
    })
    return this.handleLocalLoading(res$);
  }
}
