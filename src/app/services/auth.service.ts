import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuth, IReturn } from '../models';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: String = environment.apiUrl.general;

  constructor(private http: HttpClient) {}

  validarUsuario(username: string, passwordhash: string) {
    return this.http.get<IAuth>(
      `${this.url}auth?username=${username}&passwordhash=${passwordhash}`
    );
  }

  AccesosUsuario() {
    return this.http.get<IAuth>(`${this.url}auth/accesos`);
  }
  GeneraToken(username: string) {
    return this.http.get<IReturn>(
      `${this.url}auth/generatoken?userName=${username}`
    );
  }
  ValidaToken(token: string) {
    return this.http.get<IReturn>(
      `${this.url}auth/ValidaToken?token=${token}`
    );
  }
  RestableceContraseña(password: string, token: string) {
    const url = `${this.url}auth/actualizar?password=${(password)}&token=${(token)}`;
    return this.http.post<IReturn>(url, null); // Enviamos null porque no hay cuerpo
}

}