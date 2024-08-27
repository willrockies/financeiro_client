import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { SideBarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { CategoriaRoutingModule } from './categoria-routing.module';



@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    NavBarModule,
    SideBarModule
  ]
})
export class CategoriaModule { }
