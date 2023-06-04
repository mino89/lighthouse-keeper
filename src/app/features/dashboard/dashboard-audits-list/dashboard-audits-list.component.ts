import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Audit } from 'src/app/shared/models/audit';

@Component({
  selector: 'lhk-dashboard-audits-list',
  templateUrl: './dashboard-audits-list.component.html',
  styleUrls: ['./dashboard-audits-list.component.scss']
})
export class DashboardAuditsListComponent {
  @Input() audits!: Audit[]
  @Output() onDelete: EventEmitter<Audit> = new EventEmitter<Audit>()

  public handleDelete(audit: Audit) {
    this.onDelete.emit(audit)
  }
}
