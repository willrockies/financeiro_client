import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { Despesa } from 'src/app/models/Despesa';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {
  tipoTela: number = 1;// 1 - listagem, 2 - cadastro, 3 edição;
  tableListDespesa!: Array<Despesa>;
  id!: string;


  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  despesaForm: FormGroup = new FormGroup({});

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;


  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private despesaService: DespesaService) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 4;
    this.configpag();
    this.listarDespesa();
    this.despesaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],

      categoriaSelected: ['', [Validators.required]],

    });


    this.listarCategoriaUsuario();
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

  listarDespesa() {
    this.tipoTela = 1;
    debugger;
    let getUserLogado = this.authService.getEmailUser();
    this.despesaService.listaDespesaUsuario(getUserLogado)
      .subscribe((response: Array<Despesa>) => {
        this.tableListDespesa = response;
      }, (error) => console.error(error), () => { })
  }

  cadastro() {
    this.tipoTela = 2;
    this.despesaForm.reset();
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
    return this.despesaForm?.controls;
  }

  enviar() {
    //debugger;
    if (this.despesaForm?.valid) {
      var dados = this.dadosForm();

      let item = new Despesa();
      item.nome = dados["name"].value;
      item.valor = dados["valor"].value;
      item.pago = this.checked;
      item.dataVencimento = dados["data"].value;
      item.idCategoria = parseInt(this.categoriaSelect.id);
      item.id = 0;

      let getUserLogado = this.authService.getEmailUser();

      this.despesaService.adicionarDespesa(item)
        .subscribe((res: Despesa) => {
          this.listarDespesa();
          this.despesaForm.reset();
        }), (error: any) => console.error(error), () => { }

    }
    else{

      console.log("campo obrigatorio");
      throw new Error("campo obrigatorio");
    }

  }


  listarCategoriaUsuario() {
    debugger;
    let getUserLogado = this.authService.getEmailUser();

    var retorno = this.categoriaService.listarCategoriasUsuario(getUserLogado);
    retorno.subscribe((response: Array<Categoria>) => {
      const ListarCategorias: SelectModel[] = [];

      response.forEach(x => {
        const item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;
        ListarCategorias.push(item);
      });

      this.listCategorias = ListarCategorias;
    });

    return retorno;
  }


  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }
}
