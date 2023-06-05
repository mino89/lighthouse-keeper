import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardSitesDialogComponent } from './dashboard-sites-dialog/dashboard-sites-dialog.component';
import { DashboardAuditsListComponent } from './dashboard-audits-list/dashboard-audits-list.component';
import {DashboardSitesCardComponent} from "./dashboard-sites-card/dashboard-sites-card.component";



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardListComponent,
    DashboardDetailComponent,
    DashboardSitesDialogComponent,
    DashboardAuditsListComponent,
    DashboardSitesCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
