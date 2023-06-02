import { EssentialComponent } from '../essential-component/essential.component';
import { ColorSchemeService } from './../../services/color-scheme.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lhk-skeleton',
  templateUrl: './skeleton.component.html'
})
export class SkeletonComponent extends EssentialComponent {
  @Input() count: number = 4;
  @Input() cols: number = 4;
  @Input() rowsPerItem: number = 2;
  @Input() type: 'grid' | 'list' = 'grid';
  styles = {
    gridClass: `grid md:grid-cols-${this.cols} gap-4`,
    title: {
      backgroundColor: '',
      height: '60px',
      width: '110px'
    },
    paragraph: {
      backgroundColor: '',
      height: '20px',
      width: '100%'
    },
  }
  stylesDark = {
    ...this.styles,
    title: {
      ...this.styles.title,
      backgroundColor: '#333333'
    },
    paragraph: {
      ...this.styles.paragraph,
      backgroundColor: '#333333'
    },
  }

theme = this.colorScheme.prefersColorScheme$
constructor(
  public colorScheme: ColorSchemeService,
) {
  super()
}
generateSkeleton(count: number): Array < number > {
  const indexes = [];
  for(let i = 0; i <count; i++) {
  indexes.push(i);
}
return indexes;
  }
}
