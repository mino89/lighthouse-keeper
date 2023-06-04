import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EssentialComponent } from 'src/app/shared/components/essential-component/essential.component';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/match-password.validator';

@Component({
  selector: 'lhk-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent extends EssentialComponent {

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  },{ validator: CustomValidators.MatchingPasswords })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super()
  }

  public handleSignUp() {
    const { repeatPassword, ...userData } = this.signupForm.value
    this.authService.signup(userData as User).subscribe({
      next:(res) => {
        this.signupForm.reset()
        this.router.navigate(['/auth'])
      }
    });
  }


}
