import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/models/SelectModel';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  categoriaForm: FormGroup = new FormGroup({});

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  constructor(public menuService: MenuService, public formBuilder:FormBuilder) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]]

    });
  }

  dadosForm() {
   return this.categoriaForm?.controls;
  }

  enviar() {
    //debugger;
    if(this.categoriaForm?.valid){
      var dados = this.dadosForm();
    }
    console.log("campo obrigatorio");
    throw new Error("campo obrigatorio");

  }

}
