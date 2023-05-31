import { Component } from '@angular/core';
import { ColorSchemeService } from './shared/services/color-scheme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'LightHouse Keeper';
  logo:string = 'assets/lighthousekeeper.png';
  constructor(
    private colorSchemeService: ColorSchemeService,
  ) {
    this.colorSchemeService.load()
  }

}
