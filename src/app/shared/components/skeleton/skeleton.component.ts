import { animation } from '@angular/animations';
import { EssentialComponent } from '../essential-component/essential.component';
import { ColorSchemeService } from './../../services/color-scheme.service';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../../animations/fade-in-out.animation';

export interface SkeletonStyleItem {
  backgroundColor: string;
  height: string;
  width: string;
}
export interface SkeletonStyleConfig {
  gridClass: string;
  title:  SkeletonStyleItem
  paragraph: SkeletonStyleItem
  image: SkeletonStyleItem
}
@Component({
  selector: 'lhk-skeleton',
  templateUrl: './skeleton.component.html',
  animations: [fadeInOut()]
})
export class SkeletonComponent extends EssentialComponent implements OnInit {
  @Input() count: number = 4;
  @Input() cols: number = 4;
  @Input() rowsPerItem: number = 2 ;
  @Input() type: 'grid' | 'list' | 'audit' = 'grid';
  styles!: SkeletonStyleConfig
  stylesDark!: SkeletonStyleConfig

  theme = this.colorScheme.prefersColorScheme$
  constructor(
    public colorScheme: ColorSchemeService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.styles = {
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
      image: {
        backgroundColor: '',
        height: '10rem',
        width: '100%'
      },
    }
    this.stylesDark = {
      ...this.styles,
      title: {
        ...this.styles.title,
        backgroundColor: '#333333'
      },
      paragraph: {
        ...this.styles.paragraph,
        backgroundColor: '#333333'
      },
      image: {
        ...this.styles.image,
        backgroundColor: '#333333'
      },
    }
  }

  generateSkeleton(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
