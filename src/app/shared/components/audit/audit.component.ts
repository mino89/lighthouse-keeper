import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { urlPattern } from '../../utils/validators.utils';
import { Observable, of } from 'rxjs';
import { LighHouseStrategy, LightHouseAudit } from '../../models/lighthouse';
import { Audit } from '../../models/audit';

@Component({
  selector: 'lhk-audit',
  templateUrl: './audit.component.html',
  styles: [
  ]
})
export class AuditComponent implements OnInit{
  @Input() url!: string
  @Input() loading: Observable<boolean> = of(false)
  @Input() result!:LightHouseAudit | null
  @Output() onSubmit = new EventEmitter()
  @Output() onSave = new EventEmitter<LightHouseAudit>()
  strategyOptions = LighHouseStrategy
  urlRegex = urlPattern
  form =  this.formBuilder.group({
    url: ['', [Validators.required, Validators.pattern(urlPattern)]],
    strategy: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue({url: this.url})
  }

  handleSubmit(){
    this.onSubmit.emit(this.form.value)
  }

  handleSave(result:LightHouseAudit){
    this.onSave.emit(result)
  }


}
