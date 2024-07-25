import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  providers: [],
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent
  ]
})
export class DashboardModule { }
