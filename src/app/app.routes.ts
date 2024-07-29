import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { authGuard } from './gards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:"home", pathMatch:"full"},
    {path:'home',component:HomeComponent},
    {path:'student',component:StudentListComponent, canActivate: [authGuard]},
    {path:'student/edit/:id',component:EditStudentComponent , canActivate: [authGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'**',component:NotFoundComponent},
];
