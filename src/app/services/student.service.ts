import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../core/routers/ApiRoutes';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse, IAddStudent } from '../core/interfaces/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl: string = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  getAllStudent(): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(
      `${this.baseUrl}${ApiRoutes.Student.getAllStudent}`
    );
  }

  addStudent(data: IAddStudent): Observable<any> {
    return this._HttpClient.post<IAddStudent>(
      `${this.baseUrl}${ApiRoutes.Student.addStudent}`,
      data
    );
  }

  getStudentById(id: number): Observable<any> {
    return this._HttpClient.get<IAddStudent>(
      `${this.baseUrl}${ApiRoutes.Student.getStudentById}?id=${id}`
    );
  }
  editStudent(data: any): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${ApiRoutes.Student.editStudent}`,
      data
    );
  }

  DeleteStudent(id:number):Observable<any>{
    return this._HttpClient.delete(
      `${this.baseUrl}${ApiRoutes.Student.deleteStudent}?id=${id}`
    );
}
}
