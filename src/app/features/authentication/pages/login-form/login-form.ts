import { Component, DestroyRef, inject, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';
import { UserApi } from '../../../../core/services/user-api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  loginErrorMessage = signal<string>('');

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {
      message: 'O E-mail é obrigatorio.',
    });
    email(fieldPath.email, { message: 'O E-mail está inválido.' });

    required(fieldPath.password, { message: 'a Senha é obrigatória.' });
    minLength(fieldPath.password, 8, { message: ' A seanha deve ter no minimo 8 caracteres.' });
  });

  login() {
    const { email, password } = this.loginForm().value();

    this._userApi
      .login(email, password)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._router.navigate(['/explore']);
        },
        error: (error: HttpErrorResponse) => {
          this.loginErrorMessage.set(error.error.message);
        },
      });
  }
}
