import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaComponent } from './despesa.component';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { SideBarModule } from 'src/app/components/sidebar/sidebar.module';
import { DespesaRoutingModule } from './despesa-routing.module';



@NgModule({
  declarations: [
    DespesaComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    SideBarModule,
    DespesaRoutingModule,
  ]
})
export class DespesaModule { }
