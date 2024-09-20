import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/models/SelectModel';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {
  despesaForm: FormGroup = new FormGroup({});

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  constructor(public menuService: MenuService, public formBuilder:FormBuilder) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.despesaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      sistemaSelected: ['', [Validators.required]],
      categoriaSelected: ['', [Validators.required]],

    });
  }

  dadosForm() {
   return this.despesaForm?.controls;
  }

  enviar() {
    //debugger;
    if(this.despesaForm?.valid){
      var dados = this.dadosForm();
    }
    console.log("campo obrigatorio");
    throw new Error("campo obrigatorio");

  }

}
