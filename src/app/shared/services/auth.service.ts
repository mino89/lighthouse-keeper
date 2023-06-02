import { Injectable } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { BehaviorSubject, Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { User, UserAuth } from '../models/user';
import { Router } from '@angular/router';
import { HttpAuthResponse } from '../models/auth';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends FetchDataService {

  loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();
  currentUser$ = of(JSON.parse(localStorage.getItem('user') as string) || {})

  constructor(
    http: HttpClient,
    private router: Router,
    private feedback: FeedbackService,
    private loadingService: LoadingService
  ) {
    super(http);
  }

  public signup(params: User): Observable<HttpAuthResponse> {
    return this.fetch<HttpAuthResponse>({
      url: `/signup`,
      method: 'POST',
      body: {
        ...params,
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.feedback.getFeedback(error.error)
        throw new Error(error.error)
      }),
      tap((response: HttpAuthResponse) => {
        this.feedback.getFeedback('User created successfully')
      }
      )
    )
  }

  public login(params: UserAuth): void {
  this.fetch<HttpAuthResponse>({
      url: `/login`,
      method: 'POST',
      body: {
        ...params,
      }
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.feedback.getFeedback(error.error)
        throw new Error(error.error)
      }),
    ).subscribe({
      next: (response: HttpAuthResponse) => {4
        this.signIn(response.accessToken, response.user)
      }
    })
  }

  private signIn(token: string, user:Partial<User>) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.loggedInSubject.next(true)
    this.router.navigate(['/'])
  }

  public checkToken(): boolean {
    return !!localStorage.getItem('token')
  }

  public logout() {
    localStorage.removeItem('token')
    this.loggedInSubject.next(false)
    this.router.navigate(['/auth'])
  }
}
