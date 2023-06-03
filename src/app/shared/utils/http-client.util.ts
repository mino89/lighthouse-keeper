import { HttpParams } from "@angular/common/http";

export interface HttpParamsConfig{
  [key: string]: string
}

export function buildUrlParams(params: HttpParamsConfig): HttpParams {
  let httpParams = new HttpParams();
  Object.keys(params).forEach((key: string) => {
    httpParams = httpParams.append(key, params[key]);
  });
  return httpParams;
}
