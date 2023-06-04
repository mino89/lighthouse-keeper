import { TestBed } from '@angular/core/testing';

import { switchLoading } from './loading.util';
import { of } from 'rxjs';
describe('Loading Util', () => {
  let funct: Function = switchLoading

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(funct).toBeTruthy();
  });

  it('should return the orginal observable', () => {
    const value = 1
    const input = of(value)
    funct(input,{start:()=>{},end:()=>{}}).subscribe((output:number) => {
      expect(output).toEqual(value)
    })
  })
});
