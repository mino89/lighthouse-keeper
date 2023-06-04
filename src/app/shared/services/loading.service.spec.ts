import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('LoadingService', () => {
  let service: LoadingService;
  let loadingSubjectSpy: jasmine.SpyObj<BehaviorSubject<boolean>>;

  beforeEach(() => {
    const spyLoadingSubject = jasmine.createSpyObj('BehaviorSubject', ['next']);

    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        { provide: BehaviorSubject, useValue: spyLoadingSubject },
      ],
    });

    service = TestBed.inject(LoadingService);
    loadingSubjectSpy = TestBed.inject(BehaviorSubject) as jasmine.SpyObj<BehaviorSubject<boolean>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadingUntilComplete', () => {
    it('should start and end loading when observable completes', () => {
      const obs$: Observable<any> = of('Test');
      waitForAsync(() => {
        service.loadingUntilComplete(obs$).subscribe((res) => {
          console.log(res);
          expect(loadingSubjectSpy.next).toHaveBeenCalledTimes(2);
          expect(loadingSubjectSpy.next.calls.allArgs()).toEqual([[true], [false]]);
        });
      })
    });
  });
});
