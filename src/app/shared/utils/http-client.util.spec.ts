import { TestBed } from '@angular/core/testing';


import { buildUrlParams } from './http-client.util';
import { HttpParams } from '@angular/common/http';
describe('Http Client Utils', () => {
  let fuctions = {
    buildUrlParams
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(fuctions.buildUrlParams).toBeTruthy();

  });

  it('should return a set of http params', () => {
    const params = fuctions.buildUrlParams({key: 'value'})
    expect(params).toBeInstanceOf(HttpParams)
  })
});
