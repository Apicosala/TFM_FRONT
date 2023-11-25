import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';

const routes: Routes = [
  {
    path: 'studentsList',
    component: StudentListComponent,
  },
  {
    path: 'teachersList',
    component: TeachersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
