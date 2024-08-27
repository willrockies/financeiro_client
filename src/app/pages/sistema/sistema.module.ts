import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { SistemaRoutingModule } from './sistema-routing.module';
import { NavBarModule } from '../../components/navbar/navbar.module';
import { SideBarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [
    SistemaComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    NavBarModule,
    SideBarModule
  ]
})
export class SistemaModule { }
