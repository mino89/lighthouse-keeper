import { Component, OnDestroy } from '@angular/core';
import { cssClasses } from '../../utils/css-classes.util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lhk-essential-component',
  template: ``,
  styles: [
  ]
})
export class EssentialComponent implements OnDestroy {
  classUtils = cssClasses
  subscription =  new Subscription()

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
