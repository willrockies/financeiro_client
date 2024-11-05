import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';

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
    public sistemaService: SistemaService) { }


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
    item.Nome = dados["name"].value;
    item.id =0;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaDespesa = true;
    item.MesCopia = 0;
    item.AnoCopia = 0;

    item.NomePropriedade;
    item.mensagem;
    item.notificacoes;
    this.sistemaService.adicionarSistemaFinanceiro(item).subscribe((res: any) => {
      this.sistemaForm.reset();
      this.sistemaService.cadastrarUsuarioNoSistema(res.result.id, "wilson2@gmail.com")
        .subscribe((response: any) => {
          debugger;
        }), (error:any) => console.error(error), () => { }

    }), (error:any) => console.error(error), () => { }

  }
}
