import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';
import { UserApi } from '../../../../core/services/user-api';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ILoginParams } from '../../models/login-params';
import { setErroMessage } from '../../../../shared/utils/set-error-message';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private readonly _userApi = inject(UserApi);
  private readonly _router = inject(Router);

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
    minLength(fieldPath.password, 8, { message: ' A senha deve ter no minimo 8 caracteres.' });
  });

  loginParams = signal<ILoginParams | undefined>(undefined);

  loginResource = rxResource({
    params: () => this.loginParams(),
    stream: ({ params }) =>
      this._userApi
        .login(params.email, params.password)
        .pipe(tap(() => this._router.navigate(['/explore']))),
  });

  loginError = computed(() => setErroMessage(this.loginResource.error()));

  login() {
    const credentials = this.loginForm().value();

    this.loginParams.set(credentials);
  }
}
