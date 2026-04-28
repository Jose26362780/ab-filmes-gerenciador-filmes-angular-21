import { Component, signal } from '@angular/core';
import { Field, form, minLength, required, validate } from '@angular/forms/signals';
import { confirmPassword } from '../../validators/confirm-password';

@Component({
  selector: 'app-register-user-form',
  imports: [Field],
  templateUrl: './register-user-form.html',
})
export class RegisterUserForm {
  registerModel = signal({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'O Nome é Obrigatorio' });
    required(fieldPath.email, { message: 'O Email esta invalido' });
    required(fieldPath.password, { message: 'A Senha é Obrigatorio' });
    minLength(fieldPath.password, 8, { message: 'A Senha deve ter no minimo 8 carateres' });

    confirmPassword(fieldPath.confirmPassword, fieldPath.password);
  });
}
