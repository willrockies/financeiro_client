import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Despesa } from '../models/Despesa';


@Injectable({
  providedIn: 'root'
})


export class DespesaService {
  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  adicionarDespesa(despesa:Despesa)
  {
      return  this.httpClient.post<Despesa>(`${this.baseURL}/AdicionarDespesa`,
      despesa)
  }

}
