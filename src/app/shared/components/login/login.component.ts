import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'paa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    userName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  public get userName(): FormControl<string | null> {
    return this.loginForm.controls['userName'];
  }

  public get password(): FormControl<string | null> {
    return this.loginForm.controls['password'];
  }

  public signIn(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const userName = this.userName.value as string;
    const password = this.password.value as string;

    this.userService.signIn({ userName, password });
  }

  public goToRegistration(): void {
    this.router.navigate(['/registration']);
  }
}
