import { Injectable } from '@angular/core';
import { Site } from '../models/site';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchDataService } from './fetch-data.service';
import { LoadingService } from './loading.service';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService extends FetchDataService{

  constructor(
    http: HttpClient,
    feedback: FeedbackService,
    private loading: LoadingService,
  ) {
    super(http,feedback);
  }


  public getSites(): Observable<Site[]> {
    const res$ =  this.fetch<Site[]>({
      url: `${this.secureUrlCode}/sites`,
      method: 'GET',
      params: this.buildParams({
        _embed: 'audits'
      }),
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public getSite(id: number): Observable<Site> {
    const res$ =  this.fetch<Site>({
      url: `${this.secureUrlCode}/sites/${id}`,
      method: 'GET',
      params: this.buildParams({
        _embed: 'audits'
      }),
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public createSite(site: Site): Observable<Site> {
    const res$ =  this.fetch<Site>({
      url: `${this.secureUrlCode}/sites`,
      method: 'POST',
      body: site
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public updateSite(site: Site): Observable<Site> {
    const res$ =  this.fetch<Site>({
      url: `${this.secureUrlCode}/sites/${site.id}`,
      method: 'PUT',
      params: this.buildParams({
        _embed: 'audits'
      }),
      body: site
    })
    return this.loading.loadingUntilComplete(res$);
  }

  public deleteSite(id: number): Observable<Site> {
    const res$ =  this.fetch<Site>({
      url: `${this.secureUrlCode}/sites/${id}`,
      method: 'DELETE',
    })
    return this.loading.loadingUntilComplete(res$);
  }

}
