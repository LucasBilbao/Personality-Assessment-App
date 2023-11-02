import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPassword } from '../../validators/matchPassword.validator';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'paa-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public registrationForm = new FormGroup(
    {
      userName: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      repeatPassword: new FormControl<string>('', [Validators.required]),
    },
    { validators: [matchPassword] }
  );

  constructor(private userService: UserService, private router: Router) {}

  public get userName(): FormControl<string | null> {
    return this.registrationForm.controls['userName'];
  }

  public get password(): FormControl<string | null> {
    return this.registrationForm.controls['password'];
  }

  public get repeatPassword(): FormControl<string | null> {
    return this.registrationForm.controls['repeatPassword'];
  }

  public onSignUp(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.userService.signUp({
      userName: this.userName.value as string,
      password: this.password.value as string,
    });
    this.router.navigate(['/disclaimer']);
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
