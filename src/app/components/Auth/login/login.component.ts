import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  Loginform = this.initloginFrom();
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private router: Router,
    private translate: TranslateService // Inject TranslateService
  ) {}

  initloginFrom() {
    return this.fb.group({
      UserName: this.fb.control<string>('', [Validators.required]),
      Password: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.Loginform.invalid) {
      this.Loginform.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    this.isLoading = true;
    const Data = {
      UserName: this.Loginform.controls.UserName.value,
      Password: this.Loginform.controls.Password.value,
    };

    this._AuthService.Login(Data).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (res.Success) {
          this._AuthService.saveToken(res.Data);
          localStorage.setItem(
            'systemUser',
            String(this.Loginform.controls.UserName.value)
          );
          this.router.navigate(['/student']);
        } else {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('Error'),
            text: res.Message,
            confirmButtonText: this.translate.instant('OK'),
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('Oops...'),
          text: this.translate.instant('Something went wrong!'),
          confirmButtonText: this.translate.instant('OK'),
        });
        console.error(err);
      },
    });
  }

  isFieldInvalid(control: FormControl): boolean {
   
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
