import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable} from 'rxjs';
import { switchLoading } from '../utils/loading.util';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor() {}

  /**
   * create a global loading observable
   * @param {Observable<T>} obs$
   * @returns {Observable<T>}
   */
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
