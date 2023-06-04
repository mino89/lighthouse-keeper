import { AnimationTriggerMetadata, animate, style, transition, trigger } from "@angular/animations";

export function fadeInOut():AnimationTriggerMetadata{
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-out', style({ opacity: 0 }))
    ])
  ])
}
