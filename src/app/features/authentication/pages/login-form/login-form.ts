import { Component, DestroyRef, inject, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';
import { UserApi } from '../../../../core/services/user-api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ILoginParams } from '../../models/login-params';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);

  loginErrorMessage = signal<string>('');

  loginModel = signal<ILoginParams>({
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

  loginParams = signal<ILoginParams | undefined>(undefined);

  loginResource = rxResource({
    params: () => this.loginParams(),
    stream: ({ params }) =>
      this._userApi
        .login(params.email, params.password)
        .pipe(tap(() => this._router.navigate(['/explore']))),
  });

  login() {
    const { email, password } = this.loginForm().value();

    this.loginParams.set({ email, password });
  }
}
