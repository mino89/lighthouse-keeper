import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export enum Themes {
  dark = 'dark',
  light = 'light',
}
@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  private renderer: Renderer2
  private preferColorSchemeSubject = new BehaviorSubject<string>(this.prefersColorScheme)
  themes = [Themes.dark, Themes.light]
  prefersColorScheme$ = this.preferColorSchemeSubject.asObservable()
  get prefersColorScheme(): Themes {
    const item = localStorage.getItem('prefers-color')
    return item as Themes
  }
  set prefersColorScheme(color: Themes) {
    localStorage.setItem('prefers-color', color)
  }

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  /**
   * Apply the provided theme to the body
   * @param {Themes} style
   * @returns {void}
   */
  private applyTheme(style: Themes): void {
    const themes = [...this.themes]
    const index = themes.indexOf(style)
    themes.splice(index, 1)
    this.renderer.removeClass(document.body, `${themes[0]}-theme`)
    this.renderer.addClass(document.body, `${style}-theme`)
  }

  /**
   * Check if the user has a preferred color scheme
   * @returns {void}
   */
  private checkPreferredColorScheme():void {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      if (!this.prefersColorScheme) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.prefersColorScheme = Themes.dark
        } else {
          this.prefersColorScheme = Themes.light
        }
      }
    }
    this.applyTheme(this.prefersColorScheme)
  }
  /**
   * used to load the color scheme in components
   */
  load(): void {
    this.checkPreferredColorScheme()
  }

  /**
   * change the color scheme theme
   * @param {Themes} theme
  */
  switchTheme(theme?: Themes): void {
    if (theme) {
      this.prefersColorScheme = theme
      this.applyTheme(this.prefersColorScheme)
      this.preferColorSchemeSubject.next(this.prefersColorScheme)
    } else {
      localStorage.removeItem('prefers-color')
      this.checkPreferredColorScheme()
    }

  }
}
