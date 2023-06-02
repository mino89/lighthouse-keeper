import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'lhk-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$
  constructor(
    private loadingService : LoadingService
  ) { }
}
