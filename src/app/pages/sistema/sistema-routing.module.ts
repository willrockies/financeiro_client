import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaComponent } from './sistema.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SistemaComponent }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
