import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private snackBar: SnackbarService
  ) { }
  /**
   * return a snackbar with the provided message
   * @param {string} message
   */
  public getFeedback(message: string){
    return this.snackBar.open({
      message,
      action: 'Close',
      duration: 3000
    })
  }
}
