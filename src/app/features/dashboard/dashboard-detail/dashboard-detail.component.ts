import { LighthouseService } from './../../../shared/services/lighthouse.service';
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
import { LighHouseStrategy, LightHouseAudit } from 'src/app/shared/models/lighthouse';
import { HttpParamsConfig } from 'src/app/shared/utils/http-client.util';
import { AuditsService } from 'src/app/shared/services/audits.service';
import { Audit } from 'src/app/shared/models/audit';

@Component({
  selector: 'lhk-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDetailComponent extends EssentialComponent {
  site$!: Observable<Site>
  currentId!: number
  loading$: Observable<boolean> = this.lighthouseService.loading$
  auditResult!: LightHouseAudit | null
  auditStrategy = LighHouseStrategy
  constructor(
    private route: ActivatedRoute,
    private sitesService: SitesService,
    private auditsService: AuditsService,
    private dialog: MatDialog,
    private feedback: FeedbackService,
    private router: Router,
    private lighthouseService: LighthouseService
  ) {
    super();
    this.route.params.subscribe(params => {
      this.site$ = this.sitesService.getSite(params['id'])
      this.currentId = parseInt(params['id'])
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
    if (site) {
      this.sitesService.updateSite({
        ...site,
        id: this.currentId
      }).subscribe({
        next: (site) => {
          this.feedback.getFeedback('Site updated successfully')
          this.site$ = this.sitesService.getSite(this.currentId)
        }
      })
    }
  }

  public handleDeleteSite(site: Site) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250',
      data: {
        message: 'Are you sure you want to delete this site?',
        confirmLabel: 'Delete',
        dismissLabel: 'Cancel'
      }
    })
    this.subscription.add(
      dialogRef.afterClosed().subscribe(result =>
          result && this.deleteSite(site)
        )
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

  public launchAudit(site: HttpParamsConfig) {
    this.lighthouseService.audit(site).subscribe({
      next: (data) => {
        this.feedback.getFeedback('Lighthouse audit completed successfully')
        this.auditResult = data
      }
    })
  }

  public saveAudit(auditData: LightHouseAudit) {
    const requestData: Audit = {
      siteId: this.currentId,
      date: new Date(),
      auditData: auditData
    }
    this.auditsService.createAudit(requestData).subscribe(
      {
        next: (daa) => {
          this.auditResult = null
          this.feedback.getFeedback('Audit saved successfully')
          this.site$ = this.sitesService.getSite(this.currentId)
        }
      }
    )
  }

  public handleDeleteAudit(audit: Audit) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250',
      data: {
        message: 'Are you sure you want to delete this audit?',
        confirmLabel: 'Delete',
        dismissLabel: 'Cancel'
      }
    })
    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        result && this.deleteAudit(audit)
      })
    )
  }

  private deleteAudit(audit: Audit) {
    this.auditsService.deleteAudit(audit.id as number).subscribe({
      next: () => {
        console.log('audit deleted')
        this.feedback.getFeedback('Audit deleted successfully')
        this.site$ = this.sitesService.getSite(this.currentId)
      }
    })
  }

}
