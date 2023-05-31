import { Component, Input } from '@angular/core';

@Component({
  selector: 'lhk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() title!: string;
  @Input() logo!: string
}
