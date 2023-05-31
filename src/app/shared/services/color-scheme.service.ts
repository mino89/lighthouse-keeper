import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

export enum Themes{
  dark= 'dark',
  light = 'light',
}
@Injectable({
  providedIn: 'root'
})
export class ColorSchemeService {
  private renderer: Renderer2
  themes = [Themes.dark, Themes.light]
  get prefersColorScheme(): Themes{
    const item = localStorage.getItem('prefers-color')
    return item as Themes
  }
  set prefersColorScheme(color: Themes){
    localStorage.setItem('prefers-color', color)
  }

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null,null)
  }

  private applyTheme(style:Themes){
    const themes = [...this.themes]
    const index = themes.indexOf(style)
    themes.splice(index,1)
    this.renderer.removeClass(document.body, `${themes[0]}-theme`)
    this.renderer.addClass(document.body, `${style}-theme`)
  }

  private checkPreferredColorScheme(){
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      if(!this.prefersColorScheme){
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          this.prefersColorScheme = Themes.dark
        }else{
          this.prefersColorScheme = Themes.light
        }
      }
    }
    this.applyTheme(this.prefersColorScheme)
  }

  load(): void{
    this.checkPreferredColorScheme()
  }

  switchTheme(theme?:Themes):void{
    if(theme){
      this.prefersColorScheme = theme
      this.applyTheme(this.prefersColorScheme)
    }else{
      localStorage.removeItem('prefers-color')
      this.checkPreferredColorScheme()
    }

  }
}
