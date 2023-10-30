import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../../validators/matchPassword.validator';

@Component({
  selector: 'paa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public registrationForm = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: [matchPassword] }
  );

  public get userName(): FormControl<string | null> {
    return this.registrationForm.controls['userName'];
  }

  public get password(): FormControl<string | null> {
    return this.registrationForm.controls['password'];
  }

  public get repeatPassword(): FormControl<string | null> {
    return this.registrationForm.controls['repeatPassword'];
  }

  public onSignUp(): void {}
}
