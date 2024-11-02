import { Component } from '@angular/core';
import { IReturn } from '../../../models';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services';
import { RolComponent } from '../rol/rol.component';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../core/services/notification.service';
import { IRol } from '../../../models/rol.interface';

@Component({
  selector: 'app-rol-lista',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './rol-lista.component.html'
})
export class RolListaComponent {

  modalRef!: BsModalRef;
  listaRol!: IRol[];
  loadin = false;

  constructor( private modalService:BsModalService, private notification:NotificationService, 
    private rolService: RolService) { 

  }


  ngOnInit(): void {
    this.onBuscar();
  }


  onBuscar() {
    this.loadin = true;
    this.rolService.get().subscribe(result =>{
      this.listaRol = result;
    })
  }

  onNuevo() {

    RolComponent.prototype.IdRol=0;
    this.modalRef = this.modalService.show(RolComponent, { ignoreBackdropClick: true, class: "modal-md" });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.onBuscar();
      }
    });
  } 


  onEditar(idrol: number){  
    RolComponent.prototype.IdRol=idrol;
    this.modalRef = this.modalService.show(RolComponent,{ ignoreBackdropClick:true});
    this.modalRef.content.event.subscribe((result: IReturn) =>{
      if(result.success){
        this.onBuscar();
      }
    })
  }

  onEliminar(id: number){
    this.notification.Confirm('Confirmar si se elimina el Rol').then(confirm => {
      if (confirm) {
        this.rolService.delete(id).subscribe(result => {
          if (result.success) {
            this.onBuscar();
          }
          this.notification.Return(result);
        });
      }
    });
  }

}
