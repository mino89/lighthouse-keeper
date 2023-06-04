import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lhk-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent {

  loggedIn$ = this.authService.loggedIn$;
  @Input() title!: string;
  @Input() logo!: string;

  constructor(
    private authService: AuthService
  ) {}


  public logout():void{
    this.authService.logout()
  }

}
