import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaComponent } from './despesa.component';
import { Router, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: DespesaComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class DespesaRoutingModule { }
