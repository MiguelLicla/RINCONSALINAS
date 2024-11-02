import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaestraComponent } from '../maestra/maestra.component';
import { FieldFilterContainsPipe } from '../../core/pipes/field-filter-contains.pipe';
import { IMaestra, IMaestraArgu, IReturn } from '../../models';
import { MaestraService } from '../../services';
import { NotificationService } from '../../core/services';

@Component({
  selector: 'app-maestra-lista',
  standalone: true,
  imports: [CommonModule, ModalModule, FormsModule, FieldFilterContainsPipe],
  templateUrl: './maestra-lista.component.html'
})
export class MaestraListaComponent {

  modalRef!: BsModalRef;
  listaMaestra!: IMaestra[];
  listaMaestraArgu!: IMaestraArgu[];
  listaPadre!: IMaestraArgu[];
  listaHijos!: IMaestraArgu[];
  loadin = true;
  titulo = '';


  maestra!: IMaestra;
  maestraIndex = 0;
  idpadre = 0;

  filmaestra = '';
  flagMantenible = true;
  flagMostrarHijos = false;

  // Flag_Abreviado = false;
  // Flag_Codigo = false;
  // Flag_Descripcion = false;

  constructor(
    private maestraService: MaestraService, private modalService: BsModalService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.maestraService.get().subscribe(result => {
      this.listaMaestra = result;
      this.titulo = 'Listado de ' + this.listaMaestra[0].descripcion;
      this.CargarMaestrosArgu(this.listaMaestra[0], 0);
      // this.loadin = false;
    });
  }

  CargarMaestrosArgu(maestra: IMaestra, index: number) {
    // this.loadin = true;
    this.titulo = this.listaMaestra[index].descripcion;
    this.flagMantenible = this.listaMaestra[index].flagMantenible;
    this.maestraService.getArgu(maestra.idMaestra, 0).subscribe(result => {
      this.listaMaestraArgu = result;
      this.listaHijos = result;
      // this.loadin = false;
      this.maestra = maestra;
      this.maestraIndex = index;
    });
    if (maestra.idPadre > 0) {
      this.maestraService.getArgu(maestra.idPadre, 0).subscribe(result => {
        this.listaPadre = result;
        this.flagMostrarHijos = true;
      });
    } else {
      this.flagMostrarHijos = false;
    }
  }

  nuevoArgu() {
    MaestraComponent.prototype.id = 0;
    MaestraComponent.prototype.Maestra = this.maestra;
    this.modalRef = this.modalService.show(MaestraComponent, { ignoreBackdropClick: true, class: 'modal-md' });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.CargarMaestrosArgu(this.maestra, this.maestraIndex);
      }
    });
  }

  editarMaestraArgu(id: number, idmaestra: number) {
    MaestraComponent.prototype.id = id;
    MaestraComponent.prototype.Maestra = this.maestra;
    this.modalRef = this.modalService.show(MaestraComponent, { ignoreBackdropClick: true, class: 'modal-md' });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.CargarMaestrosArgu(this.maestra, this.maestraIndex);
      }
    });
  }

  eliminarMaestraArgu(id: number) {
    this.notification.Confirm('Confirmar si se elimina el registro').then((confirm) => {
      if (confirm) {
        this.maestraService.delete(id).subscribe(result => {
          if (result.success) {
            this.CargarMaestrosArgu(this.maestra, this.maestraIndex);
          }
          this.notification.Return(result);
        });
      }
    });
  }

  activarMaestraArgu(item: IMaestraArgu) {
    let mensaje = '';
    if (item.flagActivo) { mensaje = 'Desea desactivar el registro'; } else { mensaje = 'Desea activar el registro'; }
    this.notification.Confirm(mensaje).then(confirm => {
      if (confirm) {
        this.loadin = true;
        item.flagActivo = !item.flagActivo;
        this.maestraService.putArgu(item).subscribe(result => {
          if (result.success) {
            this.CargarMaestrosArgu(this.maestra, this.maestraIndex);
          }
          this.loadin = false;
        });
      }
    });
  }

  filtrarHijos() {
    console.log(this.idpadre);
    if (Number(this.idpadre) === 0) {
      this.listaHijos = this.listaMaestraArgu;
    } else {
      this.listaHijos = this.listaMaestraArgu.filter(item => Number(item.idPadre) === Number(this.idpadre));
    }
  }

}
