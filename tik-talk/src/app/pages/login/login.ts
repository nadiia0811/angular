import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginPage {
  form: FormGroup<{ username: any, password: any }> = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);

  onSubmit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.getRawValue() as { username: string, password: string})
        .subscribe({
           next: (res) => this.router.navigate(['/']),
           error: (err) => console.error('Error: ', err)
        });
    }
  }
}
