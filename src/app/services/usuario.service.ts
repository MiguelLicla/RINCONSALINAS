import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IReturn } from '../models';
import { IUsuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = environment.apiUrl.general;

  constructor(private http: HttpClient) { }




  

  get() {
    return this.http.get<IUsuario[]>(`${this.url}Usuario/ObtenerLista`)
  }
  getId(idUsuario: number) {
    return this.http.get<IUsuario>(`${this.url}Usuario?idusuario=${idUsuario}`)
  }
  post(item: IUsuario) {
    return this.http.post<IReturn>(`${this.url}Usuario`, item)
  }
  put(item: IUsuario) {
    return this.http.put<IReturn>(`${this.url}Usuario`, item)
  }
  delete(id: number) {
    return this.http.delete<IReturn>(`${this.url}Usuario?idusuario=${id}`);
  }

}
  