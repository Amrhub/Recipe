import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  emailValue = 'test@test.co';
  passwordValue = 'test@123';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;
    this.isLoading = true;
    this.error = null;

    type AuthObs =
      | ReturnType<(typeof this.authService)['signup']>
      | ReturnType<(typeof this.authService)['login']>;

    let authObs: AuthObs;

    if (this.isLoginMode) {
      authObs = this.authService.login({ email, password });
    } else {
      authObs = this.authService.signup({ email, password });
    }

    authObs.subscribe({
      next: (_resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errRes: Error) => {
        this.error = errRes.message;
        this.isLoading = false;
      },
    });
    form.reset();
  }
}
