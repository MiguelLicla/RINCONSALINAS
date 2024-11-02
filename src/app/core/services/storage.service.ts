import { Injectable } from '@angular/core';
import { IAuth } from '../../models';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  guardarToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  leerToken() {
    let token = sessionStorage.getItem('token');
    if (token ) {return token.toString();} 
    else {return '';}
  }

  guardarAuth(auth: IAuth) {
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  leerAuth(): IAuth {
    if (sessionStorage.getItem('auth')) {
      const auth = sessionStorage.getItem('auth');
      if(auth != null){
        return JSON.parse(auth);
      }
      else {
        return {} as IAuth;
      }
    } else {
      return {} as IAuth;
    }
  }

  
  autenticarOpcion(url: string) {
    const opciones = this.leerAuth().opciones;
    let valor = false;
    if(opciones.filter(p => p.controller == url).length > 0 || url == '/home'){
      valor = true;
    }
    return valor;
  }
}
