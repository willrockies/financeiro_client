import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Despesa } from '../models/Despesa';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DespesaService {
  listarDespesa(getUserLogado: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  adicionarDespesa(despesa:Despesa)
  {
      return  this.httpClient.post<Despesa>(`${this.baseURL}/AdicionarDespesa`,despesa)
  }

  listaDespesaUsuario(emailUsuario: string): Observable<Despesa[]> {
    return this.httpClient.get<Despesa[]>(`${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`);

  }


}
