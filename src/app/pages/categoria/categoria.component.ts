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
  tipoTela: number = 1;// 1 - listagem, 2 - cadastro, 3 edição;
  tableListCategoria!: Array<Categoria>;
  id!: string;


  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

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
    this.configpag();
    this.listarCategoria();
    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],

    });
this.listarSistemaFinanceiro();
  }

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  listarCategoria() {
    this.tipoTela = 1;
    debugger;
    let getUserLogado = this.authService.getEmailUser();
    this.categoriaService.listarCategoriasUsuario(getUserLogado)
      .subscribe((response: Array<Categoria>) => {
        this.tableListCategoria = response;
      }, (error) => console.error(error), () => { })
  }

  cadastro() {
    this.tipoTela = 2;
    this.categoriaForm.reset();
  }

  mudarPage($event: number) {
    this.page = $event;
    this.config.currentPage = this.page;
  }
  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  dadosForm() {
    return this.categoriaForm?.controls;
  }

  enviar() {
    var dados = this.dadosForm();
    debugger;
    let item = new Categoria();
    item.nome = dados["name"].value;
    item.id = 0;
    item.idSistema = parseInt(this.sistemaSelect.id);

    let getUserLogado = this.authService.getEmailUser();

    this.categoriaService.adicionarCategoria(item).subscribe((res: any) => {
      this.categoriaForm.reset();
    }), (error: any) => console.error(error), () => { }


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
