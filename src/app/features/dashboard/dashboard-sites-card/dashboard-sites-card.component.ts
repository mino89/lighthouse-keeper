import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Site} from "../../../shared/models/site";

@Component({
  selector: 'lhk-dashboard-sites-card',
  templateUrl: './dashboard-sites-card.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSitesCardComponent {
  @Input() site!: Site
  @Output() onClick = new EventEmitter<Site>()

  handleClick($event:Site){
    this.onClick.emit($event)
  }
}
