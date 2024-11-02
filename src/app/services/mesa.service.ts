import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IReturn } from '../models';
import { IRol } from '../models/rol.interface';
import { IMesa } from '../models/mesa.interface';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  url: String = environment.apiUrl.general;

  constructor(private http: HttpClient) { }




  
  get() {
    return this.http.get<IMesa[]>(`${this.url}Mesa/ObtenerLista`);
  }
  getMantenimiento() {
    return this.http.get<IMesa[]>(`${this.url}Mesa/ObtenerListaMantenimiento`);
  }
  getIdmantenimiento(id: number) {
    return this.http.get<IMesa>(`${this.url}Mesa/ObtenerMesaMantenimiento?mesaid=${id}`);
  }
  getId(id: number) {
    return this.http.get<IMesa>(`${this.url}Mesa?mesaid=${id}`);
  }

  post(data: IRol) {
    return this.http.post<IReturn>(`${this.url}Mesa`, data);
  }
  put(data: IRol) {
    return this.http.put<IReturn>(`${this.url}Mesa`, data);
  }

  delete(id: number) {
    return this.http.delete<IReturn>(`${this.url}rol?id=${id}`);
  }
}
