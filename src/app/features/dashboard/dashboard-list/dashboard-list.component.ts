import { Site } from './../../../shared/models/site';
import { Component } from '@angular/core';
import { SitesService } from 'src/app/shared/services/sites.service';
import { DashboardSitesDialogComponent } from '../dashboard-sites-dialog/dashboard-sites-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'lhk-dashboard-list',
  templateUrl: './dashboard-list.component.html'
})
export class DashboardListComponent extends EssentialComponent {
  sites$ = this.sitesService.getSites();
  constructor(
    private sitesService: SitesService,
    private dialog: MatDialog,
    private feedback: FeedbackService
  ) { super()}

  public handleCreateSite(): void {
    const dialogRef = this.dialog.open(DashboardSitesDialogComponent, {
      width: '500px',
      data:<Site>{},
    })

    this.subscription.add(
      dialogRef.afterClosed().subscribe((site: Site) => {
        if (site) {
          this.createSite(site);
        }
      })
    )
  }

  private createSite(site: Site): void {
    this.sitesService.createSite(site).subscribe({
      next: () => {
        this.feedback.getFeedback('Site created successfully');
        this.sites$ = this.sitesService.getSites();
      }
    });
  }

}
