import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'lhk-loading-switch',
  templateUrl: './loading-switch.component.html',
  styles: [
  ]
})
export class LoadingSwitchComponent {
  loading$ = this.loadingService.loading$
  constructor(
    private loadingService: LoadingService
  ) {}
}
