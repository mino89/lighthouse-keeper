import { Site } from './../../../shared/models/site';
import { Component } from '@angular/core';
import { SitesService } from 'src/app/shared/services/sites.service';
import { DashboardSitesDialogComponent } from '../dashboard-sites-dialog/dashboard-sites-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { fadeInOut } from 'src/app/shared/animations/fade-in-out.animation';

@Component({
  selector: 'lhk-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  animations: [fadeInOut()]
})
export class DashboardListComponent extends EssentialComponent {
  sites$ = this.sitesService.getSites();
  currentUser$ = this.authService.currentUser$;

  constructor(
    private sitesService: SitesService,
    private dialog: MatDialog,
    private feedback: FeedbackService,
    private authService: AuthService,
    private loadingService: LoadingService
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
