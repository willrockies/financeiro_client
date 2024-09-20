import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { SideBarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    NavBarModule,
    SideBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class CategoriaModule { }
