import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  categoriaForm: FormGroup = new FormGroup({});

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private sistemaService: SistemaService,
    private authService: AuthService,
    private categoriaService: CategoriaService) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],

    });

    this.listarSistemaFinanceiro();
  }

  dadosForm() {
    return this.categoriaForm?.controls;
  }

  enviar() {
    var dados = this.dadosForm();
debugger;
    let item = new Categoria();
    item.nome = dados["name"].value;
    item.id =0;
    item.idSistema = parseInt(this.sistemaSelect.id);

    let getUserLogado = this.authService.getEmailUser();

    this.categoriaService.adicionarCategoria(item).subscribe((res: any) => {
      this.categoriaForm.reset();
    }), (error:any) => console.error(error), () => { }


  }

  listarSistemaFinanceiro() {
    let getUserLogado = this.authService.getEmailUser();

    var retorno = this.sistemaService.listaSistemasUsuario(getUserLogado);
    retorno.subscribe((response: Array<SistemaFinanceiro>) => {
      const listarSistemaFinanceiro: SelectModel[] = [];

      response.forEach(x => {
        const item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;
        listarSistemaFinanceiro.push(item);
      });

      this.listSistemas = listarSistemaFinanceiro;
    });

    return retorno;
  }

}
