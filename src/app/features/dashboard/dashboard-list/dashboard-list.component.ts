import { Component } from '@angular/core';
import { cssClasses } from 'src/app/shared/utils/css-classes.util';

@Component({
  selector: 'lhk-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent {
  classUtils = cssClasses
}
