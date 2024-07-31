import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { IAddStudent, IStudent } from '../../core/interfaces/istudent';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'], // Fix styleUrls here
})
export class StudentListComponent implements OnInit {
  @ViewChild('studentModal') studentModal!: ElementRef;
  isloading: boolean = true;
  searchQuery: string = '';
  filteredStudents: IStudent[] = [];
  studentlist: IStudent[] = [];
  AddStudentFrom = this.initAddStudentForm();
  isSubmitting: boolean = false;
  showModal = true;
  constructor(
    private _StudentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllStudent();
    const lang = localStorage.getItem('language') || 'en';
    this._translateService.setDefaultLang(lang);
    this._translateService.use(lang);
  }

  getAllStudent() {
    this._StudentService.getAllStudent().subscribe({
      next: (res) => {
        this.studentlist = res.Data;
        this.filteredStudents = this.studentlist;
        this.isloading = false;
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
      },
    });
  }

  initAddStudentForm() {
    return this.fb.group({
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
    if (this.AddStudentFrom.invalid) {
      this.AddStudentFrom.markAllAsTouched()
      return;
    }

    this.isSubmitting = true; 

    const data: IAddStudent = {
      FirstName: String(this.AddStudentFrom.controls.FirstName?.value),
      LastName: String(this.AddStudentFrom.controls.LastName?.value),
      Mobile: String(this.AddStudentFrom.controls.Mobile?.value),
      Email: String(this.AddStudentFrom.controls.Email?.value),
      NationalID: String(this.AddStudentFrom?.controls?.NationalID?.value),
      Age: Number(this.AddStudentFrom?.controls?.Age?.value),
    };

    this._StudentService.addStudent(data).subscribe({
      next: (res) => {
        this.isSubmitting = false; 
        if (res.Success) {
          Swal.fire({
            icon: 'success',
            title: this._translateService.instant('Success'),
            text: res.Message,
            confirmButtonText: this._translateService.instant('OK'),
          }).then(() => {
            this.AddStudentFrom.reset();
            this.showModal = false;
            this.getAllStudent();
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: this._translateService.instant('Error'),
            text: res.Message,
            confirmButtonText: this._translateService.instant('OK'),
          })
        }
      },
      error: (err) => {
        this.isSubmitting = false; 
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: this._translateService.instant('Oops...'),
          text: this._translateService.instant('Something went wrong!'),
          confirmButtonText: this._translateService.instant('OK'),
        })
      },
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/student/edit', id]);
  }

  DeleteStudent(id: number) {
    this._translateService
      .get([
        'ARE_YOU_SURE',
        'CANNOT_RECOVER',
        'YES_DELETE',
        'DELETED',
        'STUDENT_DELETED',
        'ERROR',
        'ERROR_DELETING',
      ])
      .subscribe((translations) => {
        Swal.fire({
          title: translations['ARE_YOU_SURE'],
          text: translations['CANNOT_RECOVER'],
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: translations['YES_DELETE'],
        }).then((result) => {
          if (result.isConfirmed) {
            this._StudentService.DeleteStudent(id).subscribe({
              next: () => {
                Swal.fire(
                  translations['DELETED'],
                  translations['STUDENT_DELETED'],
                  'success'
                );
                this.getAllStudent();
              },
              error: (err) => {
                Swal.fire(
                  translations['ERROR'],
                  translations['ERROR_DELETING'],
                  'error'
                );
                console.error('Error deleting student', err);
              },
            });
          }
        });
      });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredStudents = this.studentlist.filter(
      (student) =>
        student.Name.toLowerCase().includes(query) ||
        student.Mobile.includes(query) ||
        student.NationalID.includes(query) ||
        student.Age.toString().includes(query)
    );
  }


  isFieldInvalid(control: FormControl): boolean {
   
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
