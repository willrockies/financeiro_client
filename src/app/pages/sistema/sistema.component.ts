import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {
  tipoTela: number = 1;// 1 - listagem, 2 - cadastro, 3 edição;
  tableListSistemas!: Array<SistemaFinanceiro>;
  id!: string;
  sistemaForm: FormGroup = new FormGroup({});

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;


  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    private authService: AuthService) { }


  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.configpag();
    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });

    this.ListaSistemasUsuario();
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

  ListaSistemasUsuario() {
    this.tipoTela = 1;
    //debugger;
    let getUserLogado = this.authService.getEmailUser();
    this.sistemaService.listaSistemasUsuario(getUserLogado)
      .subscribe((response: Array<SistemaFinanceiro>) => {
        this.tableListSistemas = response;
      }, (error) => console.error(error), () => { })
  }
  cadastro() {
    this.tipoTela = 2;
    this.sistemaForm.reset();
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
    return this.sistemaForm?.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    let item = new SistemaFinanceiro();
    item.nome = dados["name"].value;
    item.id = 0;
    item.mes = 0;
    item.ano = 0;
    item.diaFechamento = 0;
    item.gerarCopiaDespesa = true;
    item.mesCopia = 0;
    item.anoCopia = 0;

    item.nomePropriedade;
    item.mensagem;
    item.notificacoes;

    let getUserLogado = this.authService.getEmailUser();

    this.sistemaService.adicionarSistemaFinanceiro(item).subscribe((res: any) => {
      this.sistemaForm.reset();
      this.sistemaService.cadastrarUsuarioNoSistema(res.result.id, getUserLogado)
        .subscribe((response: any) => {
          debugger;
          this.ListaSistemasUsuario();
        }), (error: any) => console.error(error), () => { }

    }), (error: any) => console.error(error), () => { }

  }
}
