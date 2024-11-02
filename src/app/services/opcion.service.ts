import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOpcion } from '../models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  url: String = environment.apiUrl.general;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<IOpcion[]>(`${this.url}opcion`)
  }
}
