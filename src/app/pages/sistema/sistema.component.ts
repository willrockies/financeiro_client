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
  sistemaForm: FormGroup = new FormGroup({});
  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    private authService: AuthService) { }


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
    var dados = this.dadosForm();

    let item = new SistemaFinanceiro();
    item.nome = dados["name"].value;
    item.id =0;
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
        }), (error:any) => console.error(error), () => { }

    }), (error:any) => console.error(error), () => { }

  }
}
