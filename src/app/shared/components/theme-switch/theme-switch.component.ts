import { ColorSchemeService, Themes} from './../../services/color-scheme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'lhk-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {
  constructor(
    private colorSchemeService: ColorSchemeService,
  ){}
  selectedScheme = this.colorSchemeService.prefersColorScheme;
  themes = Themes;

  switchScheme(scheme: Themes) {
    this.selectedScheme = scheme;
    this.toggleDarkMode();
  }

  toggleDarkMode() {
    this.colorSchemeService.switchTheme(this.selectedScheme)
  }
}
