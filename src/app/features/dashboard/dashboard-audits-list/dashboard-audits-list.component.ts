import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeInOut } from 'src/app/shared/animations/fade-in-out.animation';
import { Audit } from 'src/app/shared/models/audit';

@Component({
  selector: 'lhk-dashboard-audits-list',
  templateUrl: './dashboard-audits-list.component.html',
  animations: [fadeInOut()]
})
export class DashboardAuditsListComponent {
  @Input() audits!: Audit[]
  @Output() onDelete: EventEmitter<Audit> = new EventEmitter<Audit>()

  public handleDelete(audit: Audit) {
    this.onDelete.emit(audit)
  }
}
