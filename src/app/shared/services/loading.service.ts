import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, concat, concatMap, finalize, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor() {}

  public loadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
    .pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    )
  }

  private loadingOn(): void {
    this.loadingSubject.next(true);
  }

  private loadingOff(): void {
    this.loadingSubject.next(false);
  }


}
