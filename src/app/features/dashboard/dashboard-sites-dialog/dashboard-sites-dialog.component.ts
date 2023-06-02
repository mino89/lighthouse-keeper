import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Site } from 'src/app/shared/models/site';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';

@Component({
  selector: 'lhk-dashboard-sites-dialog',
  templateUrl: './dashboard-sites-dialog.component.html',
  styles: [
  ]
})
export class DashboardSitesDialogComponent extends EssentialComponent {
  urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  form = this.formBuilder.group({
    title: [this.data.title, [Validators.required]],
    url: [this.data.url, [Validators.required, Validators.pattern(this.urlRegex)]],
    description: [this.data.description, [Validators.required]],
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Site,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DashboardSitesDialogComponent>,
  ){
    super();
  }

  public handleConfirm(): void {
    console.log(this.form.value)
    this.dialogRef.close(this.form.value);
  }

}
