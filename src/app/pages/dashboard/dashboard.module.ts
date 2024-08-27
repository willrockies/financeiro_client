import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavBarModule } from 'src/app/components/navbar/navbar.module';
import { SideBarModule } from 'src/app/components/sidebar/sidebar.module';

@NgModule({
  providers: [],
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavBarModule,
    SideBarModule
  ]
})
export class DashboardModule { }
