import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'lhk-loading-switch',
  templateUrl: './loading-switch.component.html',
  styles: [
  ]
})
export class LoadingSwitchComponent implements OnInit {
  loading$ = this.loadingService.loading$
  @Input() loading!: Observable<boolean>
  constructor(
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if(this.loading){
      this.loading$ = this.loading
    }
  }

}
