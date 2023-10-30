import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchPassword(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password?.value === repeatPassword?.value
    ? null
    : { passwordMismatch: { message: 'Passwords should be the same.' } };
}
