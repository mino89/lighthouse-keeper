import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Site } from 'src/app/shared/models/site';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { urlPattern } from 'src/app/shared/utils/validators.utils';
@Component({
  selector: 'lhk-dashboard-sites-dialog',
  templateUrl: './dashboard-sites-dialog.component.html',
  styles: [
  ]
})
export class DashboardSitesDialogComponent extends EssentialComponent {
  urlRegex = urlPattern;

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
    this.dialogRef.close(this.form.value);
  }

}
