import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Categoria } from '../models/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  adicionarCategoria(categoria: Categoria) {
    return this.httpClient.post<Categoria>(`${this.baseURL}/AdicionarCategoria`, categoria)

  }


  listarCategoriasUsuario(emailUsuario:string) : Observable<Categoria[]>
  {
      return this.httpClient.get<Categoria[]>(`${this.baseURL}/ListarCategoriasUsuario?emailUsuario=${emailUsuario}`);
  }


}
