import { Component, Input } from '@angular/core';

@Component({
  selector: '[lhk-sub-header]',
  templateUrl: './sub-header.component.html',
  styles: [
  ]
})
export class SubHeaderComponent{
  @Input({required:true}) title!: string;
  @Input() backToUrl!: string;
}
