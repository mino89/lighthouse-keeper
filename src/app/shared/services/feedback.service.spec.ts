import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';
import { SnackbarService } from './snackbar.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    const spySnackbarService = jasmine.createSpyObj('SnackbarService', ['open']);

    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        { provide: SnackbarService, useValue: spySnackbarService },
      ],
    });

    service = TestBed.inject(FeedbackService);
    snackbarServiceSpy = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackbarService.open with the provided message', () => {
    const message = 'Test message';
    const mockSnackbarRef = {
      message,
      action: 'Close',
      duration: 3000
    };

    snackbarServiceSpy.open.and.returnValue(mockSnackbarRef as any);

    service.getFeedback(message);

    expect(snackbarServiceSpy.open).toHaveBeenCalledWith({
      message,
      action: 'Close',
      duration: 3000,
    });
  });

});
