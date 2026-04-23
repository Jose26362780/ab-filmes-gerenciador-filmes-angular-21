import { Component, signal } from '@angular/core';
import { email, form, minLength, required, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-login-form',
  imports: [Field],
  templateUrl: './login-form.html',
})
export class LoginForm {
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

  
}
