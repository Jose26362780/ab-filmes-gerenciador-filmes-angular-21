import { validate } from '@angular/forms/signals';

export function confirmPassword(confirmPasswordField: any, passwordField: any) {
  validate(confirmPasswordField.confirmPassword, ({ value, valueOf }) => {
    const confirmPassword = value();
    const password = valueOf(passwordField);

    if (confirmPassword != password)
      return {
        kind: 'confirmPassword',
        message: 'As Senhas devem ser iguais',
      };
    return null;
  });
}
