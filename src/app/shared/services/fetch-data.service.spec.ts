import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { FetchDataService, FetchDataConfig } from './fetch-data.service';
import { FeedbackService } from './feedback.service';
import { LoadingService } from './loading.service';

describe('FetchDataService', () => {
  let service: FetchDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let feedbackServiceSpy: jasmine.SpyObj<FeedbackService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const spyHttpClient = jasmine.createSpyObj('HttpClient', ['request']);
    const spyFeedbackService = jasmine.createSpyObj('FeedbackService', ['getFeedback']);
    const spyLoadingService = jasmine.createSpyObj('LoadingService', ['loadingUntilComplete']);

    TestBed.configureTestingModule({
      providers: [
        FetchDataService,
        { provide: HttpClient, useValue: spyHttpClient },
        { provide: FeedbackService, useValue: spyFeedbackService },
        { provide: LoadingService, useValue: spyLoadingService },
      ],
    });

    service = TestBed.inject(FetchDataService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    feedbackServiceSpy = TestBed.inject(FeedbackService) as jasmine.SpyObj<FeedbackService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('should make an HTTP request with the provided config', () => {
      const config: FetchDataConfig = {
        url: 'example-url',
        method: 'GET',
        headers: new HttpHeaders(),
        params: new HttpParams(),
      };

      httpClientSpy.request.and.returnValue(new Observable()); // Replace `new Observable()` with a mock response if needed

      service.fetch(config);

      expect(httpClientSpy.request).toHaveBeenCalledWith(
        config.method,
        `${service.apiRoot}${config.url}`,
        {
          body: config.body,
          headers: config.headers,
          params: config.params,
        }
      );
    });

    it('should handle HTTP errors and call the feedback service', () => {
      const errorResponse: Partial<HttpErrorResponse> = {
        status: 404,
        statusText: 'Not Found',
        error: 'Error message',
      };
      const config: FetchDataConfig = {
        url: 'example-url',
        method: 'GET',
      };

      httpClientSpy.request.and.returnValue(throwError(errorResponse));
      feedbackServiceSpy.getFeedback.and.stub();

      service.fetch(config).subscribe({
        error: (error: HttpErrorResponse) => {
          expect(feedbackServiceSpy.getFeedback).toHaveBeenCalledWith(error.error);
        },
      });

      expect(httpClientSpy.request).toHaveBeenCalled();
    });
  });
})
