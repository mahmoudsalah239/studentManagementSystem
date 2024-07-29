import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent {
 editStudentForm=this.initEditStudentForm() ;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private _studentService: StudentService,

  ) {
    

    this.studentId =Number(this.route.snapshot.paramMap.get('id')); 
  }

  ngOnInit() {
    this._studentService.getStudentById(this.studentId).
    subscribe({
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
      NameArabic:this.fb.control<string>(''),
      NameEnglish:this.fb.control<string>(''),
      ID: this.fb.control<number>(0, [Validators.required]),
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
  
      console.log(this.editStudentForm.value);
      
      this._studentService.editStudent(this.editStudentForm.value).subscribe({
        next: (res) => {
          if (res.Success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: res.Message,
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                // Navigate to the student list if necessary
                this._router.navigate(['/student']);
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.Message,
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'OK'
          });
        }
      });
      
  
  }
}
