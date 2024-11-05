
export class SistemaFinanceiro  {
  id!: number;
  Nome!: number;
  Mes!: number;
  Ano!: number;
  DiaFechamento!: number;
  GerarCopiaDespesa!: boolean;
  MesCopia!: number;
  AnoCopia!: number;
  NomePropriedade:string="";
  mensagem:string="";
  notificacoes:any = [];
}
