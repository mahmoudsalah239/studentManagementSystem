import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path:'', redirectTo:"home", pathMatch:"full"},
    {path:'home',component:HomeComponent},
    {path:'student',component:StudentListComponent},
    // {path:'student/edit/:id',component:EditStudentComponent},
    // {path:'login',component:LoginComponent},
    // {path:'register',component:RegistrationComponent},
    {path:'**',component:NotFoundComponent},
];
