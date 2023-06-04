import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

interface SnackBarOptions {
  message: string,
  action?: string,
  duration?: number,
  additionalConfig?: MatSnackBarConfig | undefined
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }
  /**
  * Opens a snackbar with the provided message
  * @param {SnackBarOptions} options
  */
  public open(options: SnackBarOptions): MatSnackBarRef<any> {
    return this.snackBar.open(options.message, options.action, {
      duration: options.duration,
      ...options.additionalConfig
    })
  }

}
