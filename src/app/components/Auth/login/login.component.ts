import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  Loginform = this.initloginFrom();
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private router: Router
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
      return;
    }

    this.isLoading = true;
    const Data = {
      UserName: this.Loginform.controls.UserName.value,
      Password: this.Loginform.controls.Password.value,
    };
    console.log(Data);

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
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success',
          //   text: res.Message,

          // }).then(() => {
          //   this._AuthService.saveToken(res.Data);
          //   this.router.navigate(['/student']);
          // });
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
}
