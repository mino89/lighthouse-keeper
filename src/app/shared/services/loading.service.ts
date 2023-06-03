import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, concat, concatMap, finalize, of, switchMap, tap } from 'rxjs';
import { switchLoading } from '../utils/loading.util';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor() {}

  public loadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return switchLoading(obs$, {
      start: () => this.loadingOn(),
      end: () => this.loadingOff(),
    })
  }

  private loadingOn(): void {
    this.loadingSubject.next(true);
  }

  private loadingOff(): void {
    this.loadingSubject.next(false);
  }


}
