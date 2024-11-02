import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICargo, IMaestra, IMaestraArgu, IReturn } from '../models';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MaestraService {

  url: String = environment.apiUrl.general;
  constructor(private http: HttpClient) { }



  get() {
    return this.http.get<IMaestra[]>(`${this.url}Maestra`);
  }
  getCargoPersonal() {
    return this.http.get<ICargo[]>(`${this.url}maestra/Cargopersonal`);
  }

  getArguId(id: number) {
    return this.http.get<IMaestraArgu[]>(`${this.url}maestra/argu/item?id=${id}`);
  }

  getArgu(idmaestra: number, idpadre: number, flagactivo = false) {
    const parametro = `idmaestra=${idmaestra}&idpadre=${idpadre}&flagactivo=${flagactivo}`;
    return this.http.get<IMaestraArgu[]>(`${this.url}Maestra/Argu?${parametro}`);
  }

  postargu(item: IMaestraArgu ) {

    return this.http.post<IReturn>(`${this.url}Maestra/Argu/`, item);
  }
  putArgu(item: IMaestraArgu) {
  
    return this.http.put<IReturn>(`${this.url}Maestra/Argu/`, item)
  }
  
  delete(id: number) {
    return this.http.delete<IReturn>(`${this.url}Maestra/Argu?id=${id}`);
  }
  getPerfilVisitante( idpadre = 0, flagactivo = true) { return this.getArgu(11, 1001, flagactivo); }

  getPerfilParticipante( idpadre = 0, flagactivo = true) { return this.getArgu(11, 1002, flagactivo); }

  getTipoInscrito(flagactivo = true) { return this.getArgu(10, 0, flagactivo); }

  // Perfil - idmaestra = 11
  getPerfil( idpadre = 0, flagactivo = true) { return this.getArgu(11, idpadre, flagactivo); }
  // SubPerfil - idmaestra = 12
  getSubPerfil(flagactivo = true) { return this.getArgu(12, 0, flagactivo); }
  //Tipo de Documento de Identidad - idmaestra = 14
  getTipoDocumentoIdentidad(flagactivo = true) { return this.getArgu(14, 0, flagactivo); }
  // Sectores Industriales - idmaestra = 15
  getSectorIndustrial(flagactivo = true) { return this.getArgu(15, 0, flagactivo); }
  // Cargo - idmaestra = 16
  getCargo(flagactivo = true) { return this.getArgu(16, 0, flagactivo); }
  // Autorisacion de compra - idmaestra = 17
  getAutorizacionCompra(flagactivo = true) { return this.getArgu(17, 0, flagactivo); }
  // Sector de la feria - idmaestra = 18
  getSectorFeria(flagactivo = true) { return this.getArgu(18, 0, flagactivo); }
  // Actividad de la empresa - idmaestra = 21
  getActividad(flagactivo = true) { return this.getArgu(21, 0, flagactivo); }
  // Medios de informacion - idmaestra = 22
  getMedioInformacion(flagactivo = true) { return this.getArgu(22, 0, flagactivo); }
  // Stand - idmaestra = 23
  getStand(flagactivo = true) { return this.getArgu(23, 0, flagactivo); }
  // Conferencia - idmaestra = 24
  getConferencia(flagactivo = true) { return this.getArgu(24, 0, flagactivo); }
  // Pasarela - idmaestra = 25
  getPasarela(flagactivo = true) { return this.getArgu(25, 0, flagactivo); }

  getTiposervicio(flagactivo = true) { return this.getArgu(26, 0, flagactivo); }
  //getCargoPersonal(flagactivo = true) { return this.getArgu(27, 0, flagactivo); }
  getCargoContacto(IdCargo :number) { return this.getArgu(16, IdCargo, true); }
  getEntidad(flagactivo = true) { return this.getArgu(28, 0, flagactivo); }


}
 