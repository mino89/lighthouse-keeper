import { Observable, concatMap, finalize, of, tap } from "rxjs";

export interface SwitchLoadingConfig {
  start: Function,
  end: Function,
}

export function switchLoading<T>(obs$:Observable<T>,config:SwitchLoadingConfig):Observable<T>{
  return of(null)
  .pipe(
    tap(() => config.start()),
    concatMap(() => obs$),
    finalize(() => config.end())
  )
}

