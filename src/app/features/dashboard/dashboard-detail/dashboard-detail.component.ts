import { SitesService } from 'src/app/shared/services/sites.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { Site } from 'src/app/shared/models/site';

@Component({
  selector: 'lhk-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
})
export class DashboardDetailComponent extends EssentialComponent {
  site$!: Observable<Site>
  constructor(
    private route: ActivatedRoute,
    private sitesService: SitesService
  ) {
    super();
    this.route.params.subscribe(params => {
      this.site$ = this.sitesService.getSite(params['id'])
    })
  }
}
