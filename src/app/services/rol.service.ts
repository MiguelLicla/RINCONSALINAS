import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IReturn } from '../models';
import { IRol } from '../models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url: String = environment.apiUrl.general;

  constructor(private http: HttpClient) { }




  
  get() {
    return this.http.get<IRol[]>(`${this.url}Rol/ObtenerLista`);
  }

  getId(id: number) {
    return this.http.get<IRol>(`${this.url}Rol?idrol=${id}`);
  }

  getOpcion(id: number) {
    return this.http.get<IRol[]>(`${this.url}Rol/Opcion?id=${id}`);
  }

  post(data: IRol) {
    return this.http.post<IReturn>(`${this.url}Rol`, data);
  }
  put(data: IRol) {
    return this.http.put<IReturn>(`${this.url}Rol`, data);
  }

  delete(id: number) {
    return this.http.delete<IReturn>(`${this.url}Rol?idrol=${id}`);
  }
}
