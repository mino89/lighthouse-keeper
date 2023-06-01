import { Injectable } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FeedbackService } from './feedback.service';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { User, UserAuth } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends FetchDataService {

  loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(
     http: HttpClient,
     private router: Router,
     private feedback: FeedbackService
  ) {
    super(http);
  }

  private usersList<T>(email: string): Observable<T> {
   return this.fetch({
      url: `/users`,
      method: 'GET',
      params: new HttpParams().set('email', email)
    })
  }

  // this method is created for mock purposes in production response will be controlled by server
  public signup(params:User): Observable<User[] | unknown> {
    return this.usersList<User[]>(params.email).pipe(
      switchMap((res: User[]) => {
        if (res.length) {
          this.feedback.getFeedback('User already exists');
          return res
        } else {
          return this.fetch({
            url: `/users`,
            method: 'POST',
            body: {
              ...params,
              password: atob(params.password),
              // for mock purposes token is generated randomly
              token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }
          }).pipe(
            tap(() => this.feedback.getFeedback('User created successfully'))
          )
        }
      })
    )
  }

  // again this method is created for mock purposes in production response will be controlled by server
  public login(params: UserAuth): Observable<User[] | unknown> {
    return this.usersList(params.email).pipe(
      switchMap((res: any) => {
        if (res.length) {
          if (btoa(res[0].password) === params.password) {
            this.signIn(res[0].token);
            return res
          } else {
            this.feedback.getFeedback('Wrong password');
            return res
          }
        } else {
          this.feedback.getFeedback('User does not exist');
          return res
        }
      })
    )
  }

  private signIn(token:string){
    localStorage.setItem('token', token)
    this.loggedInSubject.next(true)
    this.router.navigate(['/'])
  }

  public checkToken(): boolean{
    return !!localStorage.getItem('token')
  }

  public logout(){
    localStorage.removeItem('token')
    this.loggedInSubject.next(false)
    this.router.navigate(['/auth'])
  }
}
