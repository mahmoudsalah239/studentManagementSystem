import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { authGuard } from './gards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'student',
    canActivate: [authGuard],
    component:StudentListComponent,
    title: 'Students',
  },
  {
    path: 'student/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/edit-student/edit-student.component').then(
        (m) => m.EditStudentComponent
      ),
    title: 'Edit',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/Auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/Auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Not Found',
  },
];
