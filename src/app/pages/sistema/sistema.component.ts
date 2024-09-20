import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {
  sistemaForm: FormGroup = new FormGroup({});
  constructor(public menuService: MenuService, public formBuilder:FormBuilder) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]]

    });
  }

  dadosForm() {
   return this.sistemaForm?.controls;
  }

  enviar() {
    //debugger;
    if(this.sistemaForm?.valid){
      var dados = this.dadosForm();
    }
    console.log("campo obrigatorio");
    throw new Error("campo obrigatorio");

  }
}
