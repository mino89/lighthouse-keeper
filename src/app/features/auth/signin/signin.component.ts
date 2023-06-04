import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { UserAuth } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'lhk-signin',
  templateUrl: './signin.component.html',

})
export class SigninComponent extends EssentialComponent{
  logo:string = 'assets/lighthousekeeper.png';
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    super()
  }

  public handleSignIn() {
    this.authService.login(this.signInForm.value as UserAuth);
  }

}
