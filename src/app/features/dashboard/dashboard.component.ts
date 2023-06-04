import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from 'src/app/shared/animations/route.animation';

@Component({
  selector: 'lhk-dashboard',
  templateUrl: './dashboard.component.html',
  animations:[routeAnimation()]
})
export class DashboardComponent {
  getAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRouteData['position'] : '';
  }
}
