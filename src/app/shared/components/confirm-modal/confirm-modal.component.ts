import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lhk-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: [
  ]
})
export class ConfirmModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  confirmAction(){
    this.dialogRef.close(true);
  }

}
