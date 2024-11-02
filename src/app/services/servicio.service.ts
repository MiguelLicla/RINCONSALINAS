import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IServicio } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url: String = environment.apiUrl.general; 
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IServicio[]>(`${this.url}servicio`);
  }
}
