import { SitesService } from 'src/app/shared/services/sites.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { Site } from 'src/app/shared/models/site';
import { MatDialog } from '@angular/material/dialog';
import { DashboardSitesDialogComponent } from '../dashboard-sites-dialog/dashboard-sites-dialog.component';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'lhk-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDetailComponent extends EssentialComponent {
  site$!: Observable<Site>
  currentId!: number
  constructor(
    private route: ActivatedRoute,
    private sitesService: SitesService,
    private dialog: MatDialog,
    private feedback: FeedbackService,
    private router: Router,
  ) {
    super();
    this.route.params.subscribe(params => {
      this.site$ = this.sitesService.getSite(params['id'])
      this.currentId = params['id']
    })
  }

  public handleUpdateSite(site: Site) {
    const dialogRef = this.dialog.open(DashboardSitesDialogComponent, {
      width: '500px',
      data: site
    })
    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => this.updateSite(result))
    )
  }

  private updateSite(site: Site) {
    this.sitesService.updateSite({
      ...site,
      id: this.currentId
    }).subscribe({
      next: (site) => {
        this.feedback.getFeedback('Site updated successfully')
        this.site$ = of(site)
      }
    })
  }

  public handleDeleteSite(site: Site) {
    const dialogRef = this.dialog.open(ConfirmModalComponent,{
      width: '250',
      data:{
        message: 'Are you sure you want to delete this site?',
        confirmLabel: 'Delete',
        dismissLabel: 'Cancel'
      }
    })
    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => result && this.deleteSite(site))
    )
  }

  private deleteSite(site: Site) {
    this.sitesService.deleteSite(site.id).subscribe({
      next: () => {
        this.feedback.getFeedback('Site deleted successfully')
        this.router.navigate(['/dashboard'])
      }
    })
  }

}
