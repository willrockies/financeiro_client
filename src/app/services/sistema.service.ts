import { SistemaFinanceiro } from './../models/SistemaFinanceiro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SistemaService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  adicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro) {
    return this.httpClient.post<SistemaFinanceiro>(`${this.baseURL}/AdicionarSistemaFinanceiro`, sistemaFinanceiro)
  }

  listaSistemasUsuario(emailUsuario: string): Observable<SistemaFinanceiro[]> {
    return this.httpClient.get<SistemaFinanceiro[]>(`${this.baseURL}/ListaSistemaUsuario?emailUsuario=${emailUsuario}`);

  }

  cadastrarUsuarioNoSistema(idSistema: number, emailUsuario: string) {
    return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
  }
}
