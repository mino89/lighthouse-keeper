import { Component } from '@angular/core';
import packageJson from '../../../../../package.json';
@Component({
  selector: 'lhk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  version = packageJson.version;

}
