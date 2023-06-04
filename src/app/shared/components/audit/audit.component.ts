import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlPattern } from '../../utils/validators.utils';
import { Observable, of } from 'rxjs';
import { LighHouseStrategy, LightHouseAudit } from '../../models/lighthouse';
import { EssentialComponent } from '../essential-component/essential.component';

@Component({
  selector: 'lhk-audit',
  templateUrl: './audit.component.html',
  styles: [
  ]
})
export class AuditComponent extends EssentialComponent {
  @Input() url!: Observable<string>
  @Input() loading: Observable<boolean> = of(false)
  @Input() result!: LightHouseAudit | null
  @Output() onSubmit = new EventEmitter()
  @Output() onSave = new EventEmitter<LightHouseAudit>()
  strategyOptions = LighHouseStrategy
  form = this.formBuilder.group({
    url: ['', [Validators.required, Validators.pattern(urlPattern)]],
    strategy: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) {
    super()
  }

  ngOnInit(): void {
    this.subscription.add(
      this.url.subscribe(url => {
        this.form.patchValue({ url })
      })
    )
  }


  handleSubmit() {
    this.onSubmit.emit(this.form.value)
  }

  handleSave(result: LightHouseAudit) {
    this.onSave.emit(result)
  }


}
