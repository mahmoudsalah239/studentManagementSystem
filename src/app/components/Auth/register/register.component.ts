import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
  import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule,RouterLink, CommonModule],

templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  RegisterForm = this.initRegisterForm();
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private router: Router
  ) {}

  initRegisterForm() {
    return this.fb.group(
      {
        Name: this.fb.control<string>('', [Validators.required]),
        UserName: this.fb.control<string>('', [Validators.required]),
        Password: this.fb.control<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        ConfirmPassword: this.fb.control<string>('', [Validators.required]),
      },
      {
        validators: [this.passwordMatchValidator],
      }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('ConfirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.RegisterForm.invalid) {
      this.RegisterForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const Data = {
      Name: this.RegisterForm.controls.Name.value,
      UserName: this.RegisterForm.controls.UserName.value,
      Password: this.RegisterForm.controls.Password.value,
    };

    this._AuthService.Register(Data).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (res.Success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.Message,
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.Message,
            confirmButtonText: 'OK',
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonText: 'OK',
        });
        console.error(err);
      },
    });
  }

  isFieldInvalid(control: FormControl): boolean {
   
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
