import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, RouterLink, CommonModule],

  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss',
})
export class EditStudentComponent implements OnInit {
  editStudentForm = this.initEditStudentForm();
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private _studentService: StudentService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    const lang = localStorage.getItem('language') || 'en';
    this._translateService.setDefaultLang(lang);
    this._translateService.use(lang);
    this._studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        let data: any = res.Data;
        this.editStudentForm.patchValue({
          ID: data.ID,
          FirstName: data.Name.split(' ')[0],
          LastName: data.Name.split(' ')[1],
          Mobile: data.Mobile,
          Email: data.Email,
          NationalID: data.NationalID,
          Age: data.Age,
        });
      },
    });
  }
  initEditStudentForm() {
    return this.fb.group({
      NameArabic: this.fb.control<string>('', [Validators.required]),
      NameEnglish: this.fb.control<string>('', [Validators.required]),
      ID: this.fb.control<number>({ value: 0, disabled: true }, [
        Validators.required,
      ]),
      FirstName: this.fb.control<string>('', [Validators.required]),
      LastName: this.fb.control<string>('', [Validators.required]),
      Mobile: this.fb.control<string>('', [Validators.required]),
      Email: this.fb.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      NationalID: this.fb.control<string>('', [Validators.required]),
      Age: this.fb.control<number>(0, [Validators.required]),
    });
  }

  onSubmit() {
    const Data = {
      NameArabic: this.editStudentForm.controls.NameArabic.value,
      NameEnglish: this.editStudentForm.controls.NameEnglish.value,
      ID: this.editStudentForm.controls.ID.value,
      FirstName: this.editStudentForm.controls.FirstName.value,
      LastName: this.editStudentForm.controls.LastName.value,
      Mobile: this.editStudentForm.controls.Mobile.value,
      Email: this.editStudentForm.controls.Email.value,
      NationalID: this.editStudentForm.controls.NationalID.value,
      Age: this.editStudentForm.controls.Age.value,
    };
    console.log(Data);

    this._studentService.editStudent(Data).subscribe({
      next: (res) => {
        this._translateService
          .get([
            'SUCCESS_TITLE',
            'SUCCESS_MESSAGE',
            'ERROR_TITLE',
            'ERROR_MESSAGE',
            'OOPS_TITLE',
            'OOPS_MESSAGE',
            'OK',
          ])
          .subscribe((translations) => {
            if (res.Success) {
              Swal.fire({
                icon: 'success',
                title: translations['SUCCESS_TITLE'],
                text: res.Message || translations['SUCCESS_MESSAGE'],
                confirmButtonText: translations['OK'],
              }).then((result) => {
                if (result.isConfirmed) {
                  this._router.navigate(['/student']);
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: translations['ERROR_TITLE'],
                text: res.Message || translations['ERROR_MESSAGE'],
                confirmButtonText: translations['OK'],
              });
            }
          });
      },
      error: (err) => {
        console.error(err);
        this._translateService
          .get(['OOPS_TITLE', 'OOPS_MESSAGE', 'OK'])
          .subscribe((translations) => {
            Swal.fire({
              icon: 'error',
              title: translations['OOPS_TITLE'],
              text: translations['OOPS_MESSAGE'],
              confirmButtonText: translations['OK'],
            });
          });
      },
    });
  }
}
