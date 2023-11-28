import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';


import { AdminRoutingModule } from './admin-routing.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';


@NgModule({
  declarations: [
    StudentListComponent,
    TeachersListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
